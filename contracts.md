# API Contracts - Redweyne Sci-Fi Portfolio

## Overview
Backend API for contact form submissions.

## Mocked Data in Frontend
- `src/data/mock.js` - Contains personal info, projects, skills, stats, social links (static data, no backend needed)

## Backend Endpoints

### 1. Contact Form Submission
**POST** `/api/contact`

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "message": "string (required)"
}
```

**Response (201 Created):**
```json
{
  "id": "string (uuid)",
  "name": "string",
  "email": "string",
  "message": "string",
  "created_at": "datetime",
  "status": "received"
}
```

**Error Response (422):**
```json
{
  "detail": "Validation error message"
}
```

### 2. Get All Contact Messages (Admin)
**GET** `/api/contact`

**Response (200 OK):**
```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "message": "string",
    "created_at": "datetime",
    "status": "received"
  }
]
```

## MongoDB Collection
- **Collection Name:** `contact_messages`
- **Schema:**
  - `id`: UUID string
  - `name`: string
  - `email`: string
  - `message`: string
  - `created_at`: datetime
  - `status`: string (default: "received")

## Frontend Integration
- Update `Contact.jsx` to POST to `/api/contact` on form submission
- Replace mock setTimeout with actual API call
- Handle success/error responses appropriately
