# Python image use karein
FROM python:3.12-slim

# Working directory set karein
WORKDIR /app

# Files copy karein
COPY . /app

# Dependencies install karein
RUN pip install --no-cache-dir -r requirements.txt

# App chalane ki command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]