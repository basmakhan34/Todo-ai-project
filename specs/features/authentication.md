# Feature: Authentication with Better Auth

## Requirements
1. Implement Better Auth for Next.js 14.
2. Support Email/Password signup and login.
3. Secure the FastAPI backend using JWT tokens issued by Better Auth.
4. Each user must only see and manage their own tasks.

## Backend Integration
- FastAPI should verify the JWT token in the Authorization header.
- Filter all SQLModel queries by the `user_id` extracted from the token.