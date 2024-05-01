from dotenv import load_dotenv
load_dotenv()
import pymysql
from pymongo import MongoClient

# Connect to MySQL
mysql_conn = pymysql.connect(host='localhost',
                             user='root',
                             password='',
                             db='books',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

# Connect to MongoDB
mongo_client = MongoClient('localhost:27017')
mongo_db = mongo_client['books']
mongo_collection = mongo_db['updated']

# Query total rows count
with mysql_conn.cursor() as cursor:
    cursor.execute("SELECT COUNT(*) as total_rows FROM updated")
    total_rows = cursor.fetchone()['total_rows']

# Insert data from MySQL to MongoDB in chunks
chunk_size = 1000  # Adjust the chunk size as needed
offset = 0
while True:
    with mysql_conn.cursor() as cursor:
        cursor.execute("SELECT * FROM updated LIMIT %s OFFSET %s", (chunk_size, offset))
        chunk_result = cursor.fetchall()
        if not chunk_result:
            break
        mongo_collection.insert_many(chunk_result)
        offset += chunk_size
        print(f"Inserted {min(offset, total_rows)} out of {total_rows} rows")

# Close connections
mysql_conn.close()
mongo_client.close()