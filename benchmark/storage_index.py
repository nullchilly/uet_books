import pymysql
from pymongo import MongoClient
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

# Get the size of MySQL database (data length only)
mysql_cursor = mysql_conn.cursor()
mysql_cursor.execute("SELECT SUM(data_length + index_length) FROM information_schema.tables WHERE table_schema = 'books'")
mysql_size = mysql_cursor.fetchone()[0]

# Get the size of MongoDB collection
mongo_size = mongo_db.command("collstats", "updated")["storageSize"] + mongo_db.command("collstats", "updated")["totalIndexSize"]

# Close MySQL connection
mysql_cursor.close()
mysql_conn.close()

# Plotting
labels = ['MySQL', 'MongoDB']
sizes = [mysql_size, mongo_size]

plt.bar(labels, sizes, color=['blue', 'green'], width=0.5)
plt.xlabel('Database')
plt.ylabel('Size (GB)')
plt.title('Comparison of Database Sizes (Include Indexing) (biased)', fontsize=16)  # Set fontsize here
plt.show()

# Close MongoDB connection
mongo_client.close()
