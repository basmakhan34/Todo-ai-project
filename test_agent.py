from backend.ai_agent import ask_ai

# AI ko natural language mein task dein
print("Sending to AI...")
response = ask_ai("Remember to buy milk tomorrow morning")
print(f"AI Response: {response}")