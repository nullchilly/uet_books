from pymongo import MongoClient
import time
import matplotlib.pyplot as plt

# MongoDB Connection
mongo_client = MongoClient('localhost', 27017)
mongo_db = mongo_client['books']
mongo_collection = mongo_db['updated']

# Benchmarking Parameters
num_iterations = 10
titles = ["Harry Potter"]

# Check if index exists before dropping
if "Title_text" in mongo_collection.index_information():
    mongo_collection.drop_index("Title_text")

# Benchmarking MongoDB without text index
mongo_times_without_index = []
for title in titles:
    start_time = time.time()
    result = mongo_collection.find({"Title": title})
    list(result)
    mongo_times_without_index.append(time.time() - start_time)

# Benchmarking MongoDB with text index
mongo_collection.create_index([("Title", "text")])

mongo_times_with_index = []
for title in titles:
    start_time = time.time()
    result = mongo_collection.find({"$text": {"$search": title}})
    list(result)
    mongo_times_with_index.append(time.time() - start_time)

# Plotting
fig, ax = plt.subplots()
index = range(len(titles))
bar_width = 0.35
opacity = 0.8

rects1 = ax.bar(index, mongo_times_without_index, bar_width, alpha=opacity, color='b', label='MongoDB without Text Index')
rects2 = ax.bar([p + bar_width for p in index], mongo_times_with_index, bar_width, alpha=opacity, color='r', label='MongoDB with Text Index')
ax.set_xlabel('Title')
ax.set_ylabel('Average Execution Time (seconds)')
ax.set_title('Benchmarking MongoDB with and without Text Index on Title')
ax.set_xticks([p + bar_width / 2 for p in index])
# ax.set_xticklabels(titles)
ax.legend()

plt.show()

# Close Connection
mongo_client.close()
