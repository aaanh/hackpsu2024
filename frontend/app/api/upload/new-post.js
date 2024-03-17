import { MongoClient } from "mongodb";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'daseayvyl', 
  api_key: '285678358993975', 
  api_secret: 'hmWNjvKM6apBM9uAAropW2mZOpc' 
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const client = await MongoClient.connect('mongodb://localhost:27017/blog-nextjs')
    const db = client.db()

    const postCollections = db.collection('posts')
    const result = await postCollections.insertOne(data)
    console.log(result)

    client.close()
    res.status(201).json({message: 'Post Inserted'})
  }
}