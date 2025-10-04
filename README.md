# NextGenAI - API Management Platform

A Next.js application that provides API key management and authentication layer for your local LLM server, powered by Clerk authentication.

## Features

- 🔐 **Clerk Authentication v5** - Latest secure user management with social logins
- 🔑 **API Key Management** - Generate and manage multiple API keys per user
- 📊 **Rate Limiting** - Configurable rate limits per API key
- 📈 **Usage Analytics** - Track requests, tokens, and response times
- 🛡️ **Secure Proxy** - Protected gateway to your LLM server
- 💻 **Modern Dashboard** - Clean, responsive interface
- 🗄️ **PostgreSQL** - Robust database with Prisma ORM
- ⚡ **Next.js 14.2** - Latest Next.js with App Router

## Architecture

```
User Request → NextGenAI (API Gateway) → Local LLM Server
     ↓
Clerk Auth → API Key Validation → Rate Limiting → Request Logging
```

## Quick Start

### 1. Setup

```bash
# Run the setup script
node setup.js

# Or manually:
npm install --legacy-peer-deps
npx prisma generate
npx prisma db push
```

### 2. Clerk Configuration

1. Create a [Clerk account](https://clerk.com)
2. Create a new Clerk application
3. Get your API keys from the Clerk dashboard

### 3. Environment Configuration

Update your `.env` file:

```env
DATABASE_URL="your-postgresql-connection-string"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
LLM_BASE_URL="http://localhost:12434/engines/llama.cpp/v1"
LLM_MODEL="ai/gpt-oss"
```

### 4. Start the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

## Usage

### 1. Authentication
- Click "Sign Up" to create a new account
- Sign in with email/password or social providers (configured in Clerk)
- Clerk handles all authentication flows securely

### 2. Generate API Keys
- Access the dashboard at `/dashboard`
- Click "Create New API Key"
- Set a name and rate limit
- Copy your API key

### 3. Use the API

```bash
curl -X POST http://localhost:3000/api/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "ai/gpt-oss",
    "messages": [
      {
        "role": "user", 
        "content": "Hello, how are you?"
      }
    ]
  }'
```

### 4. JavaScript/Python Example

```javascript
// JavaScript
const response = await fetch('http://localhost:3000/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'ai/gpt-oss',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

```python
# Python
import requests

response = requests.post(
    'http://localhost:3000/api/v1/chat/completions',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'model': 'ai/gpt-oss',
        'messages': [{'role': 'user', 'content': 'Hello!'}]
    }
)

print(response.json()['choices'][0]['message']['content'])
```

## API Endpoints

### Authentication
- Handled by Clerk (sign-in, sign-up, user management)
- Protected routes automatically secured by middleware

### API Key Management
- `GET /api/keys` - List user's API keys
- `POST /api/keys` - Create new API key

### LLM Proxy
- `POST /api/v1/chat/completions` - Chat completions (OpenAI compatible)

## Database Schema

The application uses SQLite with Prisma ORM:

- **Users**: Store user accounts
- **ApiKeys**: Store API keys with rate limits
- **Requests**: Log all API requests for analytics

## Security Features

- 🔐 **Clerk Authentication** - Enterprise-grade security with MFA support
- 🎫 **Session Management** - Secure session handling by Clerk
- 🚦 **Rate Limiting** - Per API key request limits
- 📝 **Request Logging** - Complete audit trail
- 🛡️ **API Key Validation** - Secure key-based access control
- 🔒 **Route Protection** - Middleware-based route security

## Development

### Database Management

```bash
# View database
npx prisma studio

# Reset database
npx prisma db push --force-reset

# Generate new migration
npx prisma migrate dev
```

### Project Structure

```
├── app/
│   ├── api/           # API routes
│   ├── dashboard/     # Dashboard page
│   ├── login/         # Login page
│   └── register/      # Register page
├── lib/
│   ├── auth.ts        # Authentication utilities
│   ├── prisma.ts      # Database client
│   └── openai-client.ts # LLM client
├── prisma/
│   └── schema.prisma  # Database schema
└── README.md
```

## Deployment

For production deployment:

1. Use a proper database (PostgreSQL/MySQL)
2. Set strong secrets in environment variables
3. Enable HTTPS
4. Configure proper CORS settings
5. Set up monitoring and logging

## Troubleshooting

### Common Issues

1. **Database connection errors**: Run `npx prisma db push`
2. **LLM server not responding**: Check if your local LLM is running on the correct port
3. **Authentication issues**: Verify JWT_SECRET is set in .env

### Support

Check the logs in your terminal for detailed error messages. Most issues are related to:
- Missing environment variables
- Database not initialized
- LLM server not running