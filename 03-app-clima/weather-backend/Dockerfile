FROM python:3.9-slim

WORKDIR /app

COPY .env /app/.env

COPY requirements.txt /app/

RUN pip install -r requirements.txt

COPY . /app/

EXPOSE 5000

CMD ["python", "app.py"]

