# je veux mourir

import os
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
openai_api_key = "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"
client = OpenAI(api_key=openai_api_key)

def format_message(role, content):
    return {"role": role, "content": content}

def get_response(messages):
    completion = client.chat.completions.create(
        model='gpt-3.5-turbo', # use 'gpt-4-turbo' for the longer, specific response, but takes 20 seconds to respond
        messages=messages,
    )
    content = completion.choices[0].message.content
    return content

default_msg = format_message("system", "You are an online study tool's chatbot. Use point form for summarizing.")
user_msg = format_message("user", "Summarize the following content:\n\n" + text)

response = get_response([default_msg, user_msg])

print(response)


# take in pdf
# file = client.files.create(
#     file=pdf_bytes,
#     purpose='assistants'
# )

# # chatgpt with files inputted supposedly
# helper = client.beta.assistants.create(
#     instructions="You are an online study tool's chatbot. Use your knowledge base to best respond to the student's queries.",
#     model="gpt-4-turbo-preview",
#     tools=[{"type": "retrieval"}],
#     file_ids=[file.id]
# )

# thread = client.beta.threads.create()

# thread_message = client.beta.threads.messages.create(
#     thread_id=thread.id,
#     role="user",
#     content="summarize the content in a sentence for me please.",
#     file_ids=[file.id]
# )
