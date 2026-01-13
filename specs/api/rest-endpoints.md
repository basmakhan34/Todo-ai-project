# REST API Endpoints

## Base URL
- Development: http://localhost:8000
- Production: https://api.example.com

## Endpoints
### GET /api/tasks
List all tasks for the authenticated user.
- Query Parameters: status ("all", "pending", "completed")
- Response: Array of Task objects

### POST /api/tasks
Create a new task.
- Request Body: { "title": string, "description": string }
- Response: Created Task object

### PUT /api/tasks/{id}
Update task details or status.

### DELETE /api/tasks/{id}
Remove a task.