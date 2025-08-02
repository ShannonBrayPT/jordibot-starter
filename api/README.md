# JordiBot Backend (Azure-Ready)

This is the complete backend for JordiBot, designed to deploy on Azure App Service or a container-based environment.

## 🏗 Project Structure

- `main.py`: FastAPI app with media upload, Vision tagging, and Slack alert
- `.env`: Configuration for OpenAI and Slack
- `requirements.txt`: All dependencies

## 🚀 Local Dev

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🌐 Azure Deployment (Option 1: App Service via GitHub)

1. Create Azure Web App (Linux, Python 3.11+)
2. Set startup command:

```bash
uvicorn main:app --host=0.0.0.0 --port=8000
```

3. Set environment variables in Azure portal using `.env` contents

## ☁️ Azure Deployment (Option 2: Container)

```Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Then deploy via Azure Container Registry or GitHub Actions.