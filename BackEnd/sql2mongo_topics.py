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
mongo_db = mongo_client['topics']
mongo_collection = mongo_db['updated']

# Query data from MySQL
with mysql_conn.cursor() as cursor:
    cursor.execute("SELECT * FROM topics where lang='en'")
    result = cursor.fetchall()

# Insert data into MongoDB
mongo_collection.insert_many(result)

# Close connections
mysql_conn.close()
mongo_client.close()