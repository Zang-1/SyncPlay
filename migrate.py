import os
from sqlalchemy import create_engine, text

DATABASE_URL = "mssql+pymssql://localhost/SyncPlayDB"

def run_migration():
    engine = create_engine(DATABASE_URL)
    with engine.begin() as conn:
        try:
            # Check if IsAdmin exists
            conn.execute(text("ALTER TABLE USERS ADD IsAdmin BIT DEFAULT 0 NOT NULL"))
            print("Added IsAdmin column to USERS.")
        except Exception as e:
            print("IsAdmin column might already exist:", e)

        try:
            # Create SYSTEM_SETTINGS table
            conn.execute(text("""
                CREATE TABLE SYSTEM_SETTINGS (
                    SettingKey VARCHAR(50) PRIMARY KEY,
                    SettingValue VARCHAR(255)
                )
            """))
            print("Created SYSTEM_SETTINGS table.")
        except Exception as e:
            print("SYSTEM_SETTINGS table might already exist:", e)

        # Update schema.sql as well (we will do this using replace_file_content)

if __name__ == "__main__":
    run_migration()
