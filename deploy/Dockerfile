FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY frontend/ ./
RUN npm run build

FROM python:3.11-slim AS backend

WORKDIR /app

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt gunicorn

COPY backend/ ./
COPY --from=frontend-builder /app/frontend/build /app/static

ENV PYTHONUNBUFFERED=1
ENV PORT=8000

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "server:app"]
