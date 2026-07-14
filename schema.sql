-- Tạo bảng USERS
CREATE TABLE USERS (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(255) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    IsAdmin BIT DEFAULT 0 NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Tạo bảng MEDIA
CREATE TABLE MEDIA (
    MediaID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    SourceType VARCHAR(20) CHECK (SourceType IN ('LOCAL', 'YOUTUBE', 'SPOTIFY', 'SOUNDCLOUD')) NOT NULL,
    MediaResource NVARCHAR(MAX) NOT NULL,
    ViewsCount INT DEFAULT 0,
    UploadDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES USERS(UserID)
);

-- Tạo bảng COMMENTS
CREATE TABLE COMMENTS (
    CommentID INT IDENTITY(1,1) PRIMARY KEY,
    MediaID INT NOT NULL,
    UserID INT NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    FOREIGN KEY (MediaID) REFERENCES MEDIA(MediaID),
    FOREIGN KEY (UserID) REFERENCES USERS(UserID)
);

-- Tạo bảng INTERACTIONS
CREATE TABLE INTERACTIONS (
    UserID INT NOT NULL,
    MediaID INT NOT NULL,
    IsLike BIT NOT NULL,
    PRIMARY KEY (UserID, MediaID),
    FOREIGN KEY (UserID) REFERENCES USERS(UserID),
    FOREIGN KEY (MediaID) REFERENCES MEDIA(MediaID)
);

-- Tạo bảng SUBSCRIPTIONS
CREATE TABLE SUBSCRIPTIONS (
    SubscriberID INT NOT NULL,
    ChannelID INT NOT NULL,
    PRIMARY KEY (SubscriberID, ChannelID),
    FOREIGN KEY (SubscriberID) REFERENCES USERS(UserID),
    FOREIGN KEY (ChannelID) REFERENCES USERS(UserID)
);

-- Tạo bảng SYSTEM_SETTINGS
CREATE TABLE SYSTEM_SETTINGS (
    SettingKey VARCHAR(50) PRIMARY KEY,
    SettingValue VARCHAR(255)
);

GO

-- Tạo Stored Procedure SP_GetMediaDetails
CREATE PROCEDURE SP_GetMediaDetails
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
        U.Username;
END;

GO

-- Tạo Trigger TRG_DeleteMedia_Cascade
CREATE TRIGGER TRG_DeleteMedia_Cascade
ON MEDIA
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Xóa Comments liên quan đến Media bị xóa
    DELETE FROM COMMENTS
    WHERE MediaID IN (SELECT deleted.MediaID FROM deleted);

    -- Xóa Interactions liên quan đến Media bị xóa
    DELETE FROM INTERACTIONS
    WHERE MediaID IN (SELECT deleted.MediaID FROM deleted);
END;
GO
