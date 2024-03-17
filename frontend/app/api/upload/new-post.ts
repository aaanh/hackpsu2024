import { MongoClient } from "mongodb";
import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb://localhost:27017/blog-nextjs"
    );
    const db = client.db();

    const postCollections = db.collection("posts");
    const result = await postCollections.insertOne(data);
    console.log(result);

    client.close();
    res.status(201).json({ message: "Post Inserted" });
  }
}
