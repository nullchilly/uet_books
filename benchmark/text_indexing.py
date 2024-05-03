import pymysql
from pymongo import MongoClient
import time
import matplotlib.pyplot as plt

# MySQL Connection
mysql_conn = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='books',
    port=3306,
)

# MongoDB Connection
mongo_client = MongoClient('localhost', 27017)
mongo_db = mongo_client['books']
mongo_collection = mongo_db['updated']

# Benchmarking Parameters
field_to_index = 'Title'  # Field to index

print("FUCK OFF")

# Drop index if exists for MySQL
with mysql_conn.cursor() as cursor:
    cursor.execute(f"ALTER TABLE updated DROP INDEX IF EXISTS idx_{field_to_index}")
    print("MySQL index dropped.")

# Drop text index if exists for MongoDB
mongo_collection.drop_index([(field_to_index, 'text')])
print("MongoDB text index dropped.")

# Benchmarking MySQL indexing speed with text index
print("Indexing MySQL...")
mysql_start_time = time.time()
with mysql_conn.cursor() as cursor:
    cursor.execute(f"ALTER TABLE updated ADD FULLTEXT idx_{field_to_index} ({field_to_index})")
    mysql_conn.commit()
mysql_indexing_time = time.time() - mysql_start_time
print(f"MySQL indexing completed in {mysql_indexing_time} seconds.")

# Benchmarking MongoDB indexing speed with text index
print("Indexing MongoDB...")
mongo_start_time = time.time()
mongo_collection.create_index([(field_to_index, 'text')])
mongo_indexing_time = time.time() - mongo_start_time
print(f"MongoDB indexing completed in {mongo_indexing_time} seconds.")

# Plotting
labels = ['MySQL', 'MongoDB']
times = [mysql_indexing_time, mongo_indexing_time]

plt.bar(labels, times, color=['blue', 'green'])
plt.xlabel('Database')
plt.ylabel('Indexing Time (seconds)')
plt.title(f'Indexing Speed Comparison for {field_to_index} (Text Index)')
plt.show()

# Close connections
mysql_conn.close()
mongo_client.close()
