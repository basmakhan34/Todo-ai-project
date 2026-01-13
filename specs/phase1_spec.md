# Phase 1: In-Memory Python Console App

**Objective:** Build a command-line Todo application that stores tasks in memory.

**Functional Requirements:**
1. **Add Task**: Users can add a task with a title and description.
2. **View Tasks**: Display a list of all tasks with their ID, status (Pending/Done), and title.
3. **Mark Complete**: Users can mark a specific task as complete using its ID.
4. **Update Task**: Users can edit the title or description of an existing task.
5. **Delete Task**: Users can remove a task by its ID.
6. **Search Tasks**: Allow users to find tasks by their title or description.

**Technical Constraints:**
- Implementation: Single Python file named `src/todo.py`.
- Data Storage: Use a Python list or dictionary (In-memory).
- Interaction: Use a simple `while True` loop with `input()` prompts for the menu.