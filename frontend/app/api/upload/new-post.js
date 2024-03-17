import { MongoClient } from "mongodb";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: '***REMOVED***', 
  api_key: '***REMOVED***', 
  api_secret: '***REMOVED***' 
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