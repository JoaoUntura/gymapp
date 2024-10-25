from dotenv import load_dotenv
import os
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_openai import ChatOpenAI
load_dotenv()

chave = os.getenv('OPENAI_API_KEY')

messages = [
    SystemMessage('Traduza o texto a seguir para ingles'),
    HumanMessage('Olá estou testando o meu algoritmo')
]

modelo = ChatOpenAI(model='gpt-3.5-turbo')

resp = modelo.invoke(messages)

print(resp)

   