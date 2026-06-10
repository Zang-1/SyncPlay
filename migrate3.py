import os
from sqlalchemy import create_engine, text

DATABASE_URL = "mssql+pymssql://localhost/SyncPlayDB"

def run_migration():
    engine = create_engine(DATABASE_URL)
    with engine.begin() as conn:
        try:
            print("Adding Category column...")
            conn.execute(text("ALTER TABLE MEDIA ADD Category NVARCHAR(100) DEFAULT N'Khác' NOT NULL;"))
            print("Added Category column successfully.")
        except Exception as e:
            print("Column might already exist:", e)

        try:
            print("Updating SP_GetMediaDetails...")
            conn.execute(text("""
                ALTER PROCEDURE SP_GetMediaDetails
                    @MediaID INT
                AS
                BEGIN
                    SELECT 
                        M.MediaID,
                        M.Title,
                        M.SourceType,
                        M.MediaResource,
                        M.ViewsCount,
                        M.UploadDate,
                        M.Category,
                        U.Username AS ChannelName,
                        COUNT(DISTINCT CASE WHEN I.IsLike = 1 THEN I.UserID END) AS TotalLikes,
                        COUNT(DISTINCT CASE WHEN I.IsLike = 0 THEN I.UserID END) AS TotalDislikes,
                        COUNT(DISTINCT C.CommentID) AS TotalComments
                    FROM 
                        MEDIA M
                    INNER JOIN 
                        USERS U ON M.UserID = U.UserID
                    LEFT JOIN 
                        INTERACTIONS I ON M.MediaID = I.MediaID
                    LEFT JOIN 
                        COMMENTS C ON M.MediaID = C.MediaID
                    WHERE 
                        M.MediaID = @MediaID
                    GROUP BY 
                        M.MediaID,
                        M.Title,
                        M.SourceType,
                        M.MediaResource,
                        M.ViewsCount,
                        M.UploadDate,
                        M.Category,
                        U.Username;
                END;
            """))
            print("Altered SP_GetMediaDetails successfully.")
        except Exception as e:
            print("Failed to alter SP_GetMediaDetails:", e)

if __name__ == "__main__":
    run_migration()
