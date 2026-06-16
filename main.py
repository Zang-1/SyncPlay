import os
import re
from datetime import datetime, timedelta
from typing import Optional, List

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request, Depends, status
from fastapi.responses import StreamingResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, ForeignKey, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from jose import JWTError, jwt
from passlib.context import CryptContext

# ================= CẤU HÌNH DATABASE & JWT =================
DATABASE_URL = "mssql+pymssql://localhost/SyncPlayDB"

SECRET_KEY = "supersecretkey_syncplay"  # Thay đổi trong thực tế
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

engine = create_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI(title="SyncPlay Streaming API")

os.makedirs("static/uploads", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.on_event("startup")
def init_db_data():
    db = SessionLocal()
    try:
        # Check admin user
        admin_user = db.query(User).filter(User.Username == "admin").first()
        if not admin_user:
            hashed_password = get_password_hash("baogiang@2104")
            admin_user = User(Username="admin", PasswordHash=hashed_password, IsAdmin=True)
            db.add(admin_user)
        
        # Check settings
        def ensure_setting(key, value):
            setting = db.query(SystemSetting).filter(SystemSetting.SettingKey == key).first()
            if not setting:
                db.add(SystemSetting(SettingKey=key, SettingValue=str(value)))

        ensure_setting("MaxTotalAccounts", 100)
        ensure_setting("MaxUploadsPerUser", 10)
        
        db.commit()
    except Exception as e:
        print("Startup error:", e)
    finally:
        db.close()

# ================= MODELS (SQLAlchemy) =================
class User(Base):
    __tablename__ = "USERS"
    UserID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Username = Column(String(255), unique=True, nullable=False)
    PasswordHash = Column(String(255), nullable=False)
    IsAdmin = Column(Boolean, default=False, nullable=False)
    CreatedAt = Column(DateTime, default=datetime.utcnow)

class SystemSetting(Base):
    __tablename__ = "SYSTEM_SETTINGS"
    SettingKey = Column(String(50), primary_key=True)
    SettingValue = Column(String(255))

class Media(Base):
    __tablename__ = "MEDIA"
    MediaID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    UserID = Column(Integer, ForeignKey("USERS.UserID"), nullable=False)
    Title = Column(String(255), nullable=False)
    SourceType = Column(String(20), nullable=False)
    MediaResource = Column(String, nullable=False)
    ViewsCount = Column(Integer, default=0)
    UploadDate = Column(DateTime, default=datetime.utcnow)
    Category = Column(String(100), default="Khác", nullable=False)
    Author = Column(String(255), default="")

class Comment(Base):
    __tablename__ = "COMMENTS"
    CommentID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    MediaID = Column(Integer, ForeignKey("MEDIA.MediaID"), nullable=False)
    UserID = Column(Integer, ForeignKey("USERS.UserID"), nullable=False)
    Content = Column(String, nullable=False)

class Interaction(Base):
    __tablename__ = "INTERACTIONS"
    UserID = Column(Integer, ForeignKey("USERS.UserID"), primary_key=True)
    MediaID = Column(Integer, ForeignKey("MEDIA.MediaID"), primary_key=True)
    IsLike = Column(Boolean, nullable=False)

class Subscription(Base):
    __tablename__ = "SUBSCRIPTIONS"
    SubscriberID = Column(Integer, ForeignKey("USERS.UserID"), primary_key=True)
    ChannelID = Column(Integer, ForeignKey("USERS.UserID"), primary_key=True)

class Playlist(Base):
    __tablename__ = "PLAYLISTS"
    PlaylistID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    UserID = Column(Integer, ForeignKey("USERS.UserID"), nullable=False)
    Name = Column(String(255), nullable=False)
    CreatedAt = Column(DateTime, default=datetime.utcnow)

class PlaylistItem(Base):
    __tablename__ = "PLAYLIST_ITEMS"
    PlaylistItemID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    PlaylistID = Column(Integer, ForeignKey("PLAYLISTS.PlaylistID"), nullable=False)
    MediaID = Column(Integer, ForeignKey("MEDIA.MediaID"), nullable=False)
    Position = Column(Integer, default=0)

class History(Base):
    __tablename__ = "HISTORY"
    HistoryID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    UserID = Column(Integer, ForeignKey("USERS.UserID"), nullable=False)
    MediaID = Column(Integer, ForeignKey("MEDIA.MediaID"), nullable=False)
    WatchedAt = Column(DateTime, default=datetime.utcnow)

# ================= HELPER FUNCTIONS =================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.Username == username).first()
    if user is None:
        raise credentials_exception
    return user

async def get_current_admin(current_user: User = Depends(get_current_user)):
    if not current_user.IsAdmin:
        raise HTTPException(status_code=403, detail="Not enough privileges")
    return current_user

def chunked_file_reader(file_path: str, chunk_size: int = 1024 * 1024):
    with open(file_path, "rb") as file:
        while chunk := file.read(chunk_size):
            yield chunk

def extract_embed_url(url: str, source_type: str) -> str:
    if source_type == 'YOUTUBE':
        regex = r"(?:v=|\/)([0-9A-Za-z_-]{11}).*"
        match = re.search(regex, url)
        if match:
            video_id = match.group(1)
            return f"https://www.youtube.com/embed/{video_id}"
    elif source_type == 'SPOTIFY':
        regex = r"track\/([0-9A-Za-z]+)"
        match = re.search(regex, url)
        if match:
            track_id = match.group(1)
            return f"https://open.spotify.com/embed/track/{track_id}"
    
    raise HTTPException(status_code=400, detail="Invalid URL format or unsupported SourceType")

# ================= ROOT REDIRECT =================
@app.get("/")
async def root():
    return RedirectResponse(url="/static/index.html")

# ================= AUTH ENDPOINTS =================
@app.post("/api/auth/register")
async def register(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    # Check max accounts limit
    max_accounts_setting = db.query(SystemSetting).filter(SystemSetting.SettingKey == "MaxTotalAccounts").first()
    max_accounts = int(max_accounts_setting.SettingValue) if max_accounts_setting else 100
    user_count = db.query(User).count()
    if user_count >= max_accounts:
        raise HTTPException(status_code=403, detail="Registration is currently closed (Max accounts limit reached)")

    user = db.query(User).filter(User.Username == username).first()
    if user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(password)
    new_user = User(Username=username, PasswordHash=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully", "user_id": new_user.UserID}

@app.post("/api/auth/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.Username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.PasswordHash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.Username}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "user_id": user.UserID, 
        "username": user.Username,
        "is_admin": user.IsAdmin
    }

# ================= MEDIA ENDPOINTS =================
@app.get("/api/media/trending")
async def get_trending_media(search: Optional[str] = None, category: Optional[str] = None, sort: Optional[str] = None, db: Session = Depends(get_db)):
    """Lấy danh sách video thịnh hành (hỗ trợ tìm kiếm, lọc danh mục, sắp xếp)"""
    query = db.query(Media)
    
    if search:
        search_clean = search.replace(" ", "")
        from sqlalchemy import func, or_
        query = query.filter(
            or_(
                func.replace(Media.Title, ' ', '').ilike(f"%{search_clean}%"),
                func.replace(Media.Author, ' ', '').ilike(f"%{search_clean}%")
            )
        )
    if category and category != "Tất cả":
        query = query.filter(Media.Category.ilike(f"%{category}%"))
    
    if sort == 'newest':
        query = query.order_by(Media.UploadDate.desc(), Media.MediaID.desc())
    elif sort == 'most_viewed':
        query = query.order_by(Media.ViewsCount.desc(), Media.MediaID.desc())
    elif sort == 'most_liked':
        # Subquery to count likes
        from sqlalchemy import func
        likes_subq = db.query(Interaction.MediaID, func.count(Interaction.UserID).label('like_count')).filter(Interaction.IsLike == True).group_by(Interaction.MediaID).subquery()
        query = query.outerjoin(likes_subq, Media.MediaID == likes_subq.c.MediaID).order_by(func.coalesce(likes_subq.c.like_count, 0).desc(), Media.MediaID.desc())
    elif sort == 'author_asc':
        from sqlalchemy import case
        is_empty = case(
            (Media.Author == None, 1),
            (Media.Author == '', 1),
            (Media.Author == 'Unknown', 1),
            else_=0
        )
        query = query.order_by(is_empty, Media.Author.asc(), Media.MediaID.desc())
    elif sort == 'author_desc':
        from sqlalchemy import case
        is_empty = case(
            (Media.Author == None, 1),
            (Media.Author == '', 1),
            (Media.Author == 'Unknown', 1),
            else_=0
        )
        query = query.order_by(is_empty, Media.Author.desc(), Media.MediaID.desc())
    elif sort == 'title_asc':
        query = query.order_by(Media.Title.asc(), Media.MediaID.desc())
    elif sort == 'title_desc':
        query = query.order_by(Media.Title.desc(), Media.MediaID.desc())
    else:
        # Default sort (random will just shuffle this default set)
        query = query.order_by(Media.MediaID.desc())
        
    media_list = query.limit(50).all()
    
    if sort == 'random':
        import random
        random.shuffle(media_list)
        
    result = []
    for m in media_list:
        user = db.query(User).filter(User.UserID == m.UserID).first()
        result.append({
            "id": m.MediaID,
            "title": m.Title,
            "author": getattr(m, "Author", ""),
            "sourceType": m.SourceType,
            "resource": m.MediaResource,
            "category": getattr(m, "Category", "Khác"),
            "channelName": user.Username if user else "Unknown",
            "views": m.ViewsCount
        })
    return result

@app.get("/api/media/liked")
async def get_liked_media(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Lấy danh sách video người dùng đã thích"""
    query = text("""
        SELECT M.*, U.Username AS ChannelName
        FROM MEDIA M
        INNER JOIN INTERACTIONS I ON M.MediaID = I.MediaID
        LEFT JOIN USERS U ON M.UserID = U.UserID
        WHERE I.UserID = :uid AND I.IsLike = 1
        ORDER BY M.UploadDate DESC
    """)
    result = db.execute(query, {"uid": current_user.UserID}).fetchall()
    return [{
        "id": r.MediaID,
        "title": r.Title,
        "author": getattr(r, "Author", ""),
        "sourceType": r.SourceType,
        "resource": r.MediaResource,
        "category": getattr(r, "Category", "Khác"),
        "channelName": r.ChannelName if r.ChannelName else "Unknown",
        "views": r.ViewsCount
    } for r in result]

@app.get("/api/media/disliked")
async def get_disliked_media(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Lấy danh sách video người dùng không thích"""
    query = text("""
        SELECT M.*, U.Username AS ChannelName
        FROM MEDIA M
        INNER JOIN INTERACTIONS I ON M.MediaID = I.MediaID
        LEFT JOIN USERS U ON M.UserID = U.UserID
        WHERE I.UserID = :uid AND I.IsLike = 0
        ORDER BY M.UploadDate DESC
    """)
    result = db.execute(query, {"uid": current_user.UserID}).fetchall()
    return [{
        "id": r.MediaID,
        "title": r.Title,
        "author": getattr(r, "Author", ""),
        "sourceType": r.SourceType,
        "resource": r.MediaResource,
        "category": getattr(r, "Category", "Khác"),
        "channelName": r.ChannelName if r.ChannelName else "Unknown",
        "views": r.ViewsCount
    } for r in result]

@app.post("/api/media/upload")
async def upload_local_media(
    title: str = Form(...),
    category: str = Form(...),
    author: str = Form(""),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """API Upload file (Cần đăng nhập)"""
    max_up_setting = db.query(SystemSetting).filter(SystemSetting.SettingKey == "MaxUploadsPerUser").first()
    max_uploads = int(max_up_setting.SettingValue) if max_up_setting else 10
    media_count = db.query(Media).filter(Media.UserID == current_user.UserID).count()
    if media_count >= max_uploads:
        raise HTTPException(status_code=403, detail="You have reached your maximum upload limit")

    file_location = f"static/uploads/{file.filename}"
    
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
        
    new_media = Media(
        UserID=current_user.UserID,
        Title=title,
        Author=author,
        SourceType="LOCAL",
        MediaResource=f"/static/uploads/{file.filename}",
        Category=category
    )
    db.add(new_media)
    db.commit()
    db.refresh(new_media)
    return {"message": "Upload successful", "media": new_media}

@app.post("/api/media/link")
async def add_link_media(
    title: str = Form(...),
    category: str = Form(...),
    author: str = Form(""),
    source_type: str = Form(...),
    url: str = Form(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """API dán link YouTube/Spotify (Cần đăng nhập)"""
    max_up_setting = db.query(SystemSetting).filter(SystemSetting.SettingKey == "MaxUploadsPerUser").first()
    max_uploads = int(max_up_setting.SettingValue) if max_up_setting else 10
    media_count = db.query(Media).filter(Media.UserID == current_user.UserID).count()
    if media_count >= max_uploads:
        raise HTTPException(status_code=403, detail="You have reached your maximum upload limit")

    if source_type not in ["YOUTUBE", "SPOTIFY"]:
        raise HTTPException(status_code=400, detail="Invalid SourceType. Must be YOUTUBE or SPOTIFY")
        
    embed_url = extract_embed_url(url, source_type)
    
    new_media = Media(
        UserID=current_user.UserID,
        Title=title,
        Author=author,
        SourceType=source_type,
        MediaResource=embed_url,
        Category=category
    )
    db.add(new_media)
    db.commit()
    db.refresh(new_media)
    return {"message": "Link added successfully", "media": new_media}

@app.get("/api/media/stream/{media_id}")
async def stream_video(media_id: int, request: Request, db: Session = Depends(get_db)):
    """API Streaming Local Media chunked"""
    media = db.query(Media).filter(Media.MediaID == media_id).first()
    if not media or media.SourceType != "LOCAL":
        raise HTTPException(status_code=404, detail="Local media not found")

    file_path = media.MediaResource.lstrip("/") 
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found on server")
        
    file_size = os.path.getsize(file_path)
    
    range_header = request.headers.get("Range")
    if range_header:
        byte1, byte2 = 0, None
        match = re.search(r'bytes=(\d+)-(\d*)', range_header)
        groups = match.groups()
        
        if groups[0]: byte1 = int(groups[0])
        if groups[1] and groups[1] != '': byte2 = int(groups[1])
        
        length = file_size - byte1
        if byte2 is not None:
            length = byte2 + 1 - byte1
            
        with open(file_path, "rb") as f:
            f.seek(byte1)
            data = f.read(length)
            
        headers = {
            "Content-Range": f"bytes {byte1}-{byte1 + length - 1}/{file_size}",
            "Accept-Ranges": "bytes",
            "Content-Length": str(length),
            "Content-Type": "video/mp4",
        }
        return StreamingResponse(iter([data]), status_code=206, headers=headers)
    
    return StreamingResponse(
        chunked_file_reader(file_path),
        media_type="video/mp4"
    )

@app.get("/api/media/details/{media_id}")
async def get_media_details(media_id: int, db: Session = Depends(get_db)):
    """Gọi Stored Procedure SP_GetMediaDetails"""
    # Fix cho pymssql và mappings
    result = db.execute(text("EXEC SP_GetMediaDetails @MediaID = :id"), {"id": media_id}).first()
    if result:
        return dict(result._mapping)
    raise HTTPException(status_code=404, detail="Media not found")

@app.post("/api/media/{media_id}/view")
async def increment_view(media_id: int, db: Session = Depends(get_db)):
    """Tăng lượt xem cho video khi xem đủ thời gian"""
    media = db.query(Media).filter(Media.MediaID == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    media.ViewsCount += 1
    db.commit()
    return {"message": "View count updated", "views": media.ViewsCount}

@app.delete("/api/media/{media_id}")
async def delete_media(media_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Xóa video do người dùng tải lên hoặc admin xóa"""
    media = db.query(Media).filter(Media.MediaID == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    
    if media.UserID != current_user.UserID and not current_user.IsAdmin:
        raise HTTPException(status_code=403, detail="Not authorized to delete this media")
    
    # Xóa file vật lý nếu là LOCAL
    if media.SourceType == "LOCAL":
        file_path = media.MediaResource.lstrip("/")
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception:
                pass
            
    # Explicitly delete child rows to prevent FK constraint violation
    db.execute(text("DELETE FROM COMMENTS WHERE MediaID = :mid"), {"mid": media_id})
    db.execute(text("DELETE FROM INTERACTIONS WHERE MediaID = :mid"), {"mid": media_id})
    db.execute(text("DELETE FROM HISTORY WHERE MediaID = :mid"), {"mid": media_id})
    db.execute(text("DELETE FROM PLAYLIST_ITEMS WHERE MediaID = :mid"), {"mid": media_id})
    
    db.delete(media)
    db.commit()
    return {"message": "Media deleted successfully"}

class DeleteMediaBatchRequest(BaseModel):
    media_ids: List[int]

@app.delete("/api/media/batch")
async def delete_media_batch(request: DeleteMediaBatchRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Xóa nhiều video cùng lúc"""
    deleted_count = 0
    for media_id in request.media_ids:
        media = db.query(Media).filter(Media.MediaID == media_id).first()
        if not media:
            continue
        
        if media.UserID != current_user.UserID and not current_user.IsAdmin:
            continue
            
        if media.SourceType == "LOCAL":
            file_path = media.MediaResource.lstrip("/")
            if os.path.exists(file_path):
                try:
                    os.remove(file_path)
                except Exception:
                    pass
                
        db.execute(text("DELETE FROM COMMENTS WHERE MediaID = :mid"), {"mid": media_id})
        db.execute(text("DELETE FROM INTERACTIONS WHERE MediaID = :mid"), {"mid": media_id})
        db.execute(text("DELETE FROM HISTORY WHERE MediaID = :mid"), {"mid": media_id})
        db.execute(text("DELETE FROM PLAYLIST_ITEMS WHERE MediaID = :mid"), {"mid": media_id})
        
        db.delete(media)
        deleted_count += 1
        
    db.commit()
    return {"message": f"Deleted {deleted_count} media successfully", "deleted_count": deleted_count}


@app.put("/api/media/{media_id}")
async def edit_media(
    media_id: int,
    title: str = Form(...),
    category: str = Form(...),
    author: str = Form(""),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    media = db.query(Media).filter(Media.MediaID == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
        
    if media.UserID != current_user.UserID and not current_user.IsAdmin:
        raise HTTPException(status_code=403, detail="Not authorized to edit this media")
        
    media.Title = title
    media.Author = author
    media.Category = category
    db.commit()
    return {"message": "Media updated successfully"}

# ================= INTERACTION ENDPOINTS =================
@app.post("/api/interact/like")
async def toggle_like(
    media_id: int = Form(...),
    is_like: bool = Form(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    interaction = db.query(Interaction).filter(
        Interaction.UserID == current_user.UserID,
        Interaction.MediaID == media_id
    ).first()
    
    if interaction:
        if interaction.IsLike == is_like:
            # Nếu người dùng click lại cùng nút (like hoặc dislike), thì hủy hành động đó
            db.delete(interaction)
            message = "Interaction removed"
        else:
            interaction.IsLike = is_like
            message = "Interaction updated"
    else:
        new_interaction = Interaction(UserID=current_user.UserID, MediaID=media_id, IsLike=is_like)
        db.add(new_interaction)
        message = "Interaction added"
        
    db.commit()
    return {"message": message}

@app.post("/api/comments")
async def add_comment(
    media_id: int = Form(...),
    content: str = Form(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_comment = Comment(MediaID=media_id, UserID=current_user.UserID, Content=content)
    db.add(new_comment)
    db.commit()
    return {"message": "Comment added"}

@app.get("/api/comments/{media_id}")
async def get_comments(media_id: int, db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.MediaID == media_id).all()
    result = []
    for c in comments:
        user = db.query(User).filter(User.UserID == c.UserID).first()
        result.append({
            "comment_id": c.CommentID,
            "user_id": c.UserID,
            "username": user.Username if user else "Unknown",
            "content": c.Content
        })
    return result

@app.put("/api/comments/{comment_id}")
async def update_comment(
    comment_id: int,
    content: str = Form(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    comment = db.query(Comment).filter(Comment.CommentID == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.UserID != current_user.UserID:
        raise HTTPException(status_code=403, detail="Not authorized to edit this comment")
    
    comment.Content = content
    db.commit()
    return {"message": "Comment updated"}

@app.delete("/api/comments/{comment_id}")
async def delete_comment(
    comment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    comment = db.query(Comment).filter(Comment.CommentID == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.UserID != current_user.UserID and not current_user.IsAdmin:
        raise HTTPException(status_code=403, detail="Not authorized to delete this comment")
    
    db.delete(comment)
    db.commit()
    return {"message": "Comment deleted"}

@app.post("/api/subscribe")
async def toggle_subscribe(
    channel_username: str = Form(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    channel_user = db.query(User).filter(User.Username == channel_username).first()
    if not channel_user:
        raise HTTPException(status_code=404, detail="Channel not found")
        
    if channel_user.UserID == current_user.UserID:
        raise HTTPException(status_code=400, detail="Cannot subscribe to yourself")
        
    sub = db.query(Subscription).filter(
        Subscription.SubscriberID == current_user.UserID,
        Subscription.ChannelID == channel_user.UserID
    ).first()
    
    if sub:
        db.delete(sub)
        db.commit()
        return {"message": "Unsubscribed"}
    else:
        new_sub = Subscription(SubscriberID=current_user.UserID, ChannelID=channel_user.UserID)
        db.add(new_sub)
        db.commit()
        return {"message": "Subscribed"}

@app.get("/api/subscriptions")
async def get_subscriptions(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Lấy danh sách kênh đã đăng ký"""
    query = text("""
        SELECT U.UserID, U.Username
        FROM SUBSCRIPTIONS S
        INNER JOIN USERS U ON S.ChannelID = U.UserID
        WHERE S.SubscriberID = :uid
        ORDER BY U.Username ASC
    """)
    result = db.execute(query, {"uid": current_user.UserID}).fetchall()
    return [{"id": r.UserID, "username": r.Username} for r in result]

# ================= PROFILE ENDPOINTS =================
@app.get("/api/profile/{username}")
async def get_profile(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.Username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    upload_count = db.query(Media).filter(Media.UserID == user.UserID).count()
    sub_count = db.query(Subscription).filter(Subscription.ChannelID == user.UserID).count()
    from sqlalchemy import func
    total_views = db.query(func.sum(Media.ViewsCount)).filter(Media.UserID == user.UserID).scalar() or 0
    total_likes = db.query(Interaction).join(Media, Interaction.MediaID == Media.MediaID).filter(Media.UserID == user.UserID, Interaction.IsLike == True).count()
    total_dislikes = db.query(Interaction).join(Media, Interaction.MediaID == Media.MediaID).filter(Media.UserID == user.UserID, Interaction.IsLike == False).count()

    return {
        "user_id": user.UserID,
        "username": user.Username,
        "upload_count": upload_count,
        "subscriber_count": sub_count,
        "total_views": total_views,
        "total_likes": total_likes,
        "total_dislikes": total_dislikes,
        "created_at": user.CreatedAt.isoformat() if user.CreatedAt else None
    }

@app.get("/api/profile/{username}/media")
async def get_profile_media(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.Username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    media_list = db.query(Media).filter(Media.UserID == user.UserID).order_by(Media.UploadDate.desc()).all()
    result = []
    for m in media_list:
        result.append({
            "id": m.MediaID,
            "title": m.Title,
            "author": getattr(m, "Author", ""),
            "sourceType": m.SourceType,
            "resource": m.MediaResource,
            "category": getattr(m, "Category", "Khác"),
            "channelName": user.Username,
            "views": m.ViewsCount
        })
    return result

# ================= PLAYLIST ENDPOINTS =================
@app.get("/api/playlists")
async def get_playlists(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    playlists = db.query(Playlist).filter(Playlist.UserID == current_user.UserID).order_by(Playlist.CreatedAt.desc()).all()
    result = []
    for p in playlists:
        item_count = db.query(PlaylistItem).filter(PlaylistItem.PlaylistID == p.PlaylistID).count()
        result.append({
            "id": p.PlaylistID,
            "name": p.Name,
            "item_count": item_count,
            "created_at": p.CreatedAt.isoformat() if p.CreatedAt else None
        })
    return result

@app.post("/api/playlists")
async def create_playlist(name: str = Form(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    new_playlist = Playlist(UserID=current_user.UserID, Name=name)
    db.add(new_playlist)
    db.commit()
    db.refresh(new_playlist)
    return {"message": "Playlist created", "id": new_playlist.PlaylistID}

@app.delete("/api/playlists/{playlist_id}")
async def delete_playlist(playlist_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    playlist = db.query(Playlist).filter(Playlist.PlaylistID == playlist_id).first()
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    if playlist.UserID != current_user.UserID:
        raise HTTPException(status_code=403, detail="Not authorized")
    db.execute(text("DELETE FROM PLAYLIST_ITEMS WHERE PlaylistID = :pid"), {"pid": playlist_id})
    db.delete(playlist)
    db.commit()
    return {"message": "Playlist deleted"}

@app.put("/api/playlists/{playlist_id}")
async def rename_playlist(playlist_id: int, name: str = Form(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    playlist = db.query(Playlist).filter(Playlist.PlaylistID == playlist_id).first()
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    if playlist.UserID != current_user.UserID:
        raise HTTPException(status_code=403, detail="Not authorized")
    playlist.Name = name
    db.commit()
    return {"message": "Playlist renamed"}

class ReorderPlaylistRequest(BaseModel):
    media_ids: List[int]

@app.put("/api/playlists/{playlist_id}/reorder")
async def reorder_playlist(playlist_id: int, request: ReorderPlaylistRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    playlist = db.query(Playlist).filter(Playlist.PlaylistID == playlist_id).first()
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    if playlist.UserID != current_user.UserID:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    for index, media_id in enumerate(request.media_ids):
        item = db.query(PlaylistItem).filter(PlaylistItem.PlaylistID == playlist_id, PlaylistItem.MediaID == media_id).first()
        if item:
            item.Position = index
            
    db.commit()
    return {"message": "Playlist reordered"}

@app.get("/api/playlists/{playlist_id}")
async def get_playlist_detail(playlist_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    playlist = db.query(Playlist).filter(Playlist.PlaylistID == playlist_id).first()
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    if playlist.UserID != current_user.UserID:
        raise HTTPException(status_code=403, detail="Not authorized")
    items = db.query(PlaylistItem).filter(PlaylistItem.PlaylistID == playlist_id).order_by(PlaylistItem.Position).all()
    media_list = []
    for item in items:
        m = db.query(Media).filter(Media.MediaID == item.MediaID).first()
        if m:
            user = db.query(User).filter(User.UserID == m.UserID).first()
            media_list.append({
                "id": m.MediaID,
                "title": m.Title,
                "author": getattr(m, "Author", ""),
                "sourceType": m.SourceType,
                "resource": m.MediaResource,
                "category": getattr(m, "Category", "Khác"),
                "channelName": user.Username if user else "Unknown",
                "views": m.ViewsCount
            })
    return {
        "id": playlist.PlaylistID,
        "name": playlist.Name,
        "items": media_list
    }

@app.post("/api/playlists/{playlist_id}/items")
async def add_to_playlist(playlist_id: int, media_id: int = Form(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    playlist = db.query(Playlist).filter(Playlist.PlaylistID == playlist_id).first()
    if not playlist or playlist.UserID != current_user.UserID:
        raise HTTPException(status_code=403, detail="Not authorized")
    existing = db.query(PlaylistItem).filter(PlaylistItem.PlaylistID == playlist_id, PlaylistItem.MediaID == media_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already in playlist")
    max_pos = db.query(PlaylistItem).filter(PlaylistItem.PlaylistID == playlist_id).count()
    new_item = PlaylistItem(PlaylistID=playlist_id, MediaID=media_id, Position=max_pos)
    db.add(new_item)
    db.commit()
    return {"message": "Added to playlist"}

@app.delete("/api/playlists/{playlist_id}/items/{media_id}")
async def remove_from_playlist(playlist_id: int, media_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    playlist = db.query(Playlist).filter(Playlist.PlaylistID == playlist_id).first()
    if not playlist or playlist.UserID != current_user.UserID:
        raise HTTPException(status_code=403, detail="Not authorized")
    item = db.query(PlaylistItem).filter(PlaylistItem.PlaylistID == playlist_id, PlaylistItem.MediaID == media_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"message": "Removed from playlist"}

# ================= HISTORY ENDPOINTS =================
@app.post("/api/history")
async def record_history(media_id: int = Form(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    new_entry = History(UserID=current_user.UserID, MediaID=media_id)
    db.add(new_entry)
    db.commit()
    return {"message": "History recorded"}

@app.get("/api/history")
async def get_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    entries = db.query(History).filter(History.UserID == current_user.UserID).order_by(History.WatchedAt.desc()).limit(50).all()
    result = []
    seen_ids = set()
    for h in entries:
        if h.MediaID in seen_ids:
            continue
        seen_ids.add(h.MediaID)
        m = db.query(Media).filter(Media.MediaID == h.MediaID).first()
        if m:
            user = db.query(User).filter(User.UserID == m.UserID).first()
            result.append({
                "id": m.MediaID,
                "title": m.Title,
                "author": getattr(m, "Author", ""),
                "sourceType": m.SourceType,
                "resource": m.MediaResource,
                "category": getattr(m, "Category", "Khác"),
                "channelName": user.Username if user else "Unknown",
                "watchedAt": h.WatchedAt.isoformat() if h.WatchedAt else None
            })
    return result

@app.delete("/api/history")
async def clear_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db.execute(text("DELETE FROM HISTORY WHERE UserID = :uid"), {"uid": current_user.UserID})
    db.commit()
    return {"message": "History cleared"}

# ================= ADMIN ENDPOINTS =================
class SettingsUpdate(BaseModel):
    max_total_accounts: int
    max_uploads_per_user: int

@app.get("/api/admin/settings")
async def get_admin_settings(admin: User = Depends(get_current_admin), db: Session = Depends(get_db)):
    max_acc = db.query(SystemSetting).filter(SystemSetting.SettingKey == "MaxTotalAccounts").first()
    max_up = db.query(SystemSetting).filter(SystemSetting.SettingKey == "MaxUploadsPerUser").first()
    return {
        "max_total_accounts": int(max_acc.SettingValue) if max_acc else 100,
        "max_uploads_per_user": int(max_up.SettingValue) if max_up else 10
    }

@app.post("/api/admin/settings")
async def update_admin_settings(settings: SettingsUpdate, admin: User = Depends(get_current_admin), db: Session = Depends(get_db)):
    max_acc = db.query(SystemSetting).filter(SystemSetting.SettingKey == "MaxTotalAccounts").first()
    if max_acc:
        max_acc.SettingValue = str(settings.max_total_accounts)
    else:
        db.add(SystemSetting(SettingKey="MaxTotalAccounts", SettingValue=str(settings.max_total_accounts)))
        
    max_up = db.query(SystemSetting).filter(SystemSetting.SettingKey == "MaxUploadsPerUser").first()
    if max_up:
        max_up.SettingValue = str(settings.max_uploads_per_user)
    else:
        db.add(SystemSetting(SettingKey="MaxUploadsPerUser", SettingValue=str(settings.max_uploads_per_user)))
        
    db.commit()
    return {"message": "Settings updated successfully"}

@app.delete("/api/admin/users/{username}")
async def delete_user(username: str, admin: User = Depends(get_current_admin), db: Session = Depends(get_db)):
    if username == admin.Username:
        raise HTTPException(status_code=400, detail="Cannot delete yourself")
    
    user_to_delete = db.query(User).filter(User.Username == username).first()
    if not user_to_delete:
        raise HTTPException(status_code=404, detail="User not found")
        
    uid = user_to_delete.UserID
    
    # 1. Delete all user comments and interactions
    db.execute(text("DELETE FROM COMMENTS WHERE UserID = :uid"), {"uid": uid})
    db.execute(text("DELETE FROM INTERACTIONS WHERE UserID = :uid"), {"uid": uid})
    db.execute(text("DELETE FROM SUBSCRIPTIONS WHERE SubscriberID = :uid OR ChannelID = :uid"), {"uid": uid})
    
    # 2. Delete all user media
    medias = db.query(Media).filter(Media.UserID == uid).all()
    for m in medias:
        if m.SourceType == "LOCAL":
            file_path = m.MediaResource.lstrip("/")
            if os.path.exists(file_path):
                try: os.remove(file_path)
                except Exception: pass
        db.delete(m)
        
    # 3. Delete the user
    db.delete(user_to_delete)
    db.commit()
    return {"message": "User deleted successfully"}

class DeleteBatchRequest(BaseModel):
    usernames: List[str]

@app.post("/api/admin/users/delete_batch")
async def delete_users_batch(request: DeleteBatchRequest, admin: User = Depends(get_current_admin), db: Session = Depends(get_db)):
    deleted_count = 0
    for username in request.usernames:
        if username == admin.Username:
            continue
            
        user_to_delete = db.query(User).filter(User.Username == username).first()
        if not user_to_delete:
            continue
            
        uid = user_to_delete.UserID
        
        db.execute(text("DELETE FROM COMMENTS WHERE UserID = :uid"), {"uid": uid})
        db.execute(text("DELETE FROM INTERACTIONS WHERE UserID = :uid"), {"uid": uid})
        db.execute(text("DELETE FROM SUBSCRIPTIONS WHERE SubscriberID = :uid OR ChannelID = :uid"), {"uid": uid})
        
        medias = db.query(Media).filter(Media.UserID == uid).all()
        for m in medias:
            if m.SourceType == "LOCAL":
                file_path = m.MediaResource.lstrip("/")
                if os.path.exists(file_path):
                    try: os.remove(file_path)
                    except Exception: pass
            db.delete(m)
            
        db.delete(user_to_delete)
        deleted_count += 1
        
    db.commit()
    return {"message": f"Deleted {deleted_count} users successfully"}

@app.get("/api/admin/users")
async def get_admin_users(admin: User = Depends(get_current_admin), db: Session = Depends(get_db)):
    query = text("""
        SELECT 
            U.Username,
            U.PasswordHash,
            COUNT(DISTINCT M.MediaID) AS TotalUploads,
            COUNT(CASE WHEN I.IsLike = 1 THEN 1 END) AS TotalLikesReceived,
            COUNT(CASE WHEN I.IsLike = 0 THEN 1 END) AS TotalDislikesReceived,
            U.CreatedAt,
            U.IsAdmin
        FROM USERS U
        LEFT JOIN MEDIA M ON U.UserID = M.UserID
        LEFT JOIN INTERACTIONS I ON M.MediaID = I.MediaID
        GROUP BY U.Username, U.PasswordHash, U.CreatedAt, U.IsAdmin
        ORDER BY U.CreatedAt DESC
    """)
    result = db.execute(query).fetchall()
    return [dict(r._mapping) for r in result]

@app.post("/api/admin/users/{username}/reset_password")
async def reset_user_password(
    username: str,
    new_password: str = Form(...),
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin đặt lại mật khẩu cho người dùng"""
    user = db.query(User).filter(User.Username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.PasswordHash = get_password_hash(new_password)
    db.commit()
    return {"message": f"Password for '{username}' has been reset", "new_password": new_password}

@app.get("/api/admin/users/{username}/media")
async def get_admin_user_media(username: str, admin: User = Depends(get_current_admin), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.Username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    query = text("""
        SELECT 
            M.MediaID,
            M.Title,
            M.Author,
            M.SourceType,
            M.ViewsCount,
            M.UploadDate,
            COUNT(CASE WHEN I.IsLike = 1 THEN 1 END) AS TotalLikes,
            COUNT(CASE WHEN I.IsLike = 0 THEN 1 END) AS TotalDislikes
        FROM MEDIA M
        LEFT JOIN INTERACTIONS I ON M.MediaID = I.MediaID
        WHERE M.UserID = :uid
        GROUP BY M.MediaID, M.Title, M.Author, M.SourceType, M.ViewsCount, M.UploadDate
        ORDER BY M.UploadDate DESC
    """)
    result = db.execute(query, {"uid": user.UserID}).fetchall()
    return [dict(r._mapping) for r in result]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
