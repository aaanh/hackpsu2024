from openai import OpenAI
import requests
import fitz
import asyncio

openai_api_key = "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"


async def pdfResponse(pdf_url):
    response = requests.get(pdf_url)

    if response.status_code == 200:
        pdf_bytes = response.content
        doc = fitz.open("pdf", pdf_bytes)

        text = ""
        for page in doc:
            text += page.get_text()

    else:
        return "Failed to download the PDF"

    # TODO: dotenv api key in the future
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

    return response
