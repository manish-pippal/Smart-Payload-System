import sqlite3

def create_database():

    conn = sqlite3.connect("uav.db")

    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS uavs(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT,

        max_payload REAL,

        max_range REAL,

        battery_capacity REAL

    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS missions(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        uav_name TEXT,

        payload REAL,

        distance REAL,

        cg REAL,

        battery REAL,

        risk TEXT,

        status TEXT

    )
    """)

    conn.commit()

    conn.close()

create_database()