# Database Schema

## Tables
### users
- id: string (primary key)
- email: string (unique)
- name: string

### tasks
- id: integer (primary key)
- user_id: string (foreign key -> users.id)
- title: string (not null)
- description: text (nullable)
- completed: boolean (default: false)
- created_at: timestamp
- updated_at: timestamp