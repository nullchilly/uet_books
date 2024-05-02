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
num_iterations = 10
titles = ["Harry Potter"]

# Benchmarking MySQL
mysql_times = []
for title in titles:
    start_time = time.time()
    with mysql_conn.cursor() as cursor:
        cursor.execute(f"SELECT * FROM updated WHERE Title = '{title}'")
        result = cursor.fetchall()
    mysql_times.append(time.time() - start_time)

# Benchmarking MongoDB
mongo_times = []
for title in titles:
    start_time = time.time()
    result = mongo_collection.find({"Title": title})
    list(result)
    mongo_times.append(time.time() - start_time)

# Plotting
plt.bar(["MySQL", "MongoDB"], [sum(mysql_times) / num_iterations, sum(mongo_times) / num_iterations])
plt.ylabel('Average Execution Time (seconds)')
plt.title('Benchmarking MySQL vs MongoDB')
plt.show()

# Close Connections
mysql_conn.close()
mongo_client.close()
