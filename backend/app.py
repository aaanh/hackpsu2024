from fastapi import FastAPI, HTTPException
from flask import Flask
from motor.motor_asyncio import AsyncIOMotorClient
from starlette.middleware.cors import CORSMiddleware
from pdfResponse import pdfResponse

app = Flask(__name__)
# MongoDB connection URL
uri = "mongodb+srv://master:E1kbhQJAQGKtHmAp@hackspsu2024.6k320ih.mongodb.net/"

# origins = [
#     "https://cantcheatwiththis.tech",
#     "https://backend.cantcheatwiththis.tech",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

client = AsyncIOMotorClient(uri)
db = client["test5"]
collection = db["files"]


def file_helper(file) -> dict:
    return {
        "user_id": file["user_id"],
        "secure_url": file["secure_url"],
        "session_id": file["session_id"],
    }


def find_link(file):
    return file['secure_url']


async def get_file_link(session_id):
    document = await collection.find_one({'session_id': session_id})
    if document:
        return document['secure_url']
    else:
        return None  # or raise an exception or return a default URL


@app.route("/analyze/<session_id>", methods=["POST"])
async def analyze(session_id: str):
    document = await collection.find_one({'session_id': session_id})
    if document:
        msg = await pdfResponse(document['secure_url'])
        return msg
    else:
        return None  # or raise an exception or return a default URL


@app.route("/documents/")
async def get_documents():
    try:
        files = []
        async for file in collection.find():
            files.append(file_helper(file))
        return files
    except Exception as e:
        # Log the exception here
        print(f"An error occurred while fetching documents: {e}")
        raise HTTPException(status_code=500, detail=str(e))
