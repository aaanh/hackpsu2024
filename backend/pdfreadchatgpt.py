# je veux mourir

from openai import OpenAI

from io import BytesIO

import boto3
from PyPDF2 import PdfReader


s3 = boto3.client("s3")
obj = s3.get_object(Body=csv_buffer.getvalue(), Bucket="my-bucket", Key="https://res.cloudinary.com/daseayvyl/image/upload/v1710653761/hackspsu2024/n6q0cbiqafofumssgtta.pdf")
reader = PdfReader(BytesIO(obj["Body"].read()))

# TODO: dotenv api key in the future
chatgptahpeeaye = "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"
client = OpenAI(api_key=chatgptahpeeaye)


# take in pdf
file = client.files.create(
  file=open(reader, "rb"), #TODO: REPLACE WITH OUR MONGODB SHT
  purpose='assistants'
)

# chatgpt with files inputted supposedly
helper = client.beta.assistants.create(
  instructions="You are an online study tool's chatbot. Use your knowledge base to best respond to the student's queries.",
  model="gpt-4-turbo-preview",
  tools=[{"type": "retrieval"}],
  file_ids=[file.id]
)


# ask for a reply; creates new thread
message = helper.beta.threads.messages.create(
  thread_id=thread.id,
  role="user",
  content="summarize the content for me please.",
  file_ids=[file.id]
)