# HACKTX-24
import numpy as np  # linear algebra
import pandas as pd  # data processing, CSV file I/O (e.g., pd.read_csv)
import os
from transformers import pipeline
import wikipediaapi

# Initialize Wikipedia API with User-Agent and English language
wiki = wikipediaapi.Wikipedia(user_agent='HackTX-AnimalAI (kathiana119@gmail.com)', language='en')

# Initialize the question-answering pipeline
nlp = pipeline('question-answering', model='deepset/roberta-base-squad2')

def extract_relevant_text(page, question):
    # Keywords related to common question topics
    keywords = ['physical characteristics', 'description', 'diet', 'mannerisms', 'appearance', 'lifespan']
    question_keywords = set(question.lower().split())  # Extract keywords from the question

    # Initialize an empty string to collect relevant text
    relevant = ""
    
    # Loop through sections and check if any keyword matches section title
    for section in page.sections:
        if any(keyword in section.title.lower() for keyword in keywords) or \
           any(keyword in section.title.lower() for keyword in question_keywords):
            relevant += section.text

    # If no relevant sections were found, use the page summary as a fallback
    if not relevant:
        relevant = page.summary
    
    return relevant


# Function to retrieve content from Wikipedia and answer the user's question
def answer_question(topic, question):
    # Fetch the Wikipedia page for the given topic
    page = wiki.page(topic)
    
    # Check if the page exists
    if page.exists():
        wiki_text = extract_relevant_text(page, question)
    else:
        return "Page not found for the given topic."
    
    # Define the question and context for the QA pipeline
    questions = {
        'question': question,
        'context': wiki_text
    }

    # Run the question-answering pipeline
    answer = nlp(questions)
    return answer['answer']

# Get the topic and question from the user
topic = input("Enter the topic you want information on: ")
question = input("Enter your question: ")

# Get and print the answer
response = answer_question(topic, question)
print("Answer:", response)
