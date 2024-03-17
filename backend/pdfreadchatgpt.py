# je veux mourir

from openai import OpenAI
import requests
import fitz

# URL of the PDF file

# test pdf of linear algerbra practice problems
pdf_url = "https://res.cloudinary.com/daseayvyl/image/upload/v1710653761/hackspsu2024/n6q0cbiqafofumssgtta.pdf"

# test pdf of resume
# pdf_url = "https://res.cloudinary.com/daseayvyl/image/upload/v1710654150/hackspsu2024/wqbp9on9628o77wisqdx.pdf" 


# Changing a PDF to text
response = requests.get(pdf_url)

if response.status_code == 200:
    pdf_bytes = response.content
    doc = fitz.open("pdf", pdf_bytes)

    text = ""
    for page in doc:
        text += page.get_text()

    # print(text)
else:
    print("Failed to download the PDF")

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
)# )
