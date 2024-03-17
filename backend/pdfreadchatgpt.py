# je veux mourir

from openai import OpenAI

# TODO: dotenv api key in the future
chatgptahpeeaye = "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"
openAI = OpenAI(api_key=chatgptahpeeaye)


# take in pdf
file = client.files.create(
  file=open("knowledge.pdf", "rb"), #TODO: REPLACE WITH OUR MONGODB SHT
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
  content=userQuestion,
  file_ids=[file.id]
)