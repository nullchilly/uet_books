from pymongo import MongoClient
from pymongo.errors import OperationFailure

# Connect to MongoDB
mongo_client = MongoClient('mongodb://localhost:27017/')
mongo_db = mongo_client['books']
mongo_collection = mongo_db['updated']

# Create a text index on the 'Title' field
try:
    mongo_collection.create_index([('Title', 'text')])
    print("Text index on 'Title' field created successfully.")
except OperationFailure as e:
    print(f"Failed to create text index: {e.details}")

# Perform a fuzzy search query for the book named "can't hurt me"
# query = "can't hurt me"
query = "harry potter"
fuzzy_query = {
    "$text": {"$search": query}
}

search_results = mongo_collection.find(fuzzy_query)

print(f"Search results for '{query}':")
cnt = 0
for book in search_results:
    cnt = cnt + 1
    print(book['Title'])
print(cnt)

# Close connection
mongo_client.close()
