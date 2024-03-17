from typing import Optional, List
import asyncio
from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from pydantic import BaseModel, Field
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
from bson import ObjectId

import pdfResponse

app = FastAPI()
# MongoDB connection URL
uri = "mongodb+srv://master:E1kbhQJAQGKtHmAp@hackspsu2024.6k320ih.mongodb.net/"
URL = "mongodb+srv://seansongss:kl5ru1y1v29PvS3x@hackspsu2024.6k320ih.mongodb.net/?retryWrites=true&w=majority&appName=hackspsu2024"

client = AsyncIOMotorClient(uri)
db = client["test5"]
collection = db["files"]
# try:
#     client.admin.command('ping')
#     print("Successfully connected to MongoDB!")
# except Exception as e:
#     print(f"Error connecting to MongoDB: {e}")

# class FileModel(BaseModel):
#     id: Optional[PyObjectId] = Field(alias="_id", default=None)
#     user_id: str
#     public_id: str
#     secure_url: str
#     session_id: str

# class FileCollection(BaseModel):
#     files: List[FileModel]

# # Helper function to parse database documents
# def file_helper(file) -> dict:
#     return {
#         "id": str(file["_id"]),
#         "user_id": file["user_id"],
#         "public_id": file["public_id"],
#         "secure_url": file["secure_url"],
#         "session_id": file["session_id"],
#     }

# @app.get("/files", response_model=FileCollection, response_model_by_alias=False)
# async def get_files():
#     return FileCollection(files=await app.collection.find().to_list(1000))


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


@app.post("/analyze/{session_id}")
async def analyze(session_id: str):
    loop = asyncio.get_event_loop()
    result = loop.run_until_complete(pdfResponse(session_id))
    print(result)


@app.get("/documents/")
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
