import os
from openai import OpenAI
import requests
import fitz

# URL of the PDF file

# test pdf of linear algerbra practice problems
pdf_url = "https://res.cloudinary.com/daseayvyl/image/upload/v1710653761/hackspsu2024/n6q0cbiqafofumssgtta.pdf"

# test pdf of resume
# pdf_url = "https://res.cloudinary.com/daseayvyl/image/upload/v1710654150/hackspsu2024/wqbp9on9628o77wisqdx.pdf"
openai_api_key = "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"


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

client = OpenAI(api_key=openai_api_key)

def format_message(role, content):
    return {"role": role, "content": content}

def get_response(messages):
    completion = client.chat.completions.create(
        # use 'gpt-4-turbo' for the longer, specific response, but takes 20 seconds to respond
        model='gpt-3.5-turbo',
        messages=messages,
    )
    content = completion.choices[0].message.content
    return content

default_msg = format_message(
    "system", "You are an online study tool's chatbot. Use point form for summarizing.")
user_msg = format_message(
    "user", "Summarize the following content:\n\n" + text)

response = get_response([default_msg, user_msg])

print(response)
