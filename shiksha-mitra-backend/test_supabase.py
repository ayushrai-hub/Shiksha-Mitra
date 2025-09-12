# test_supabase_connection.py
import os
from sqlalchemy import create_engine, text

# Hardcode for test, or add load_dotenv() from dotenv import load_dotenv; load_dotenv()
DATABASE_URL = "postgresql://postgres:P/W$5DQ.AQu!7-3@db.vvdlkjqubjjlvucgjitq.supabase.co:5432/postgres"

if not DATABASE_URL:
    print("DATABASE_URL not set")
    exit(1)

try:
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM information_schema.tables LIMIT 1"))
        print("Connection successful! Tables found:")
        print([row[2] for row in result])
except Exception as e:
    print(f"Connection error: {e}")
