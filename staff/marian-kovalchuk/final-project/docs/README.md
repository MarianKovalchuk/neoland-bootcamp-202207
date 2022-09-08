# zroby!

![](https://media.giphy.com/media/RjDIwuXYPzrAEjb6HP/giphy.gif)

Aplicación para crear tareas y hacer un seguimiento de las mismas, cambiar su estado, etc.

## Functional Description

 El usuario crea una tarea y define la fecha de finalización de la ejecución.

 Todas las tareas se dividen en tres estados:

1. "New"
2. "In process"
3. "Completed"

 A medida que la tarea cambia de estado, se transfiere de una carpeta a otra. 

 Adicionalmente, asignamos una prioridad a la tarea, como "alta", "media", o "baja".

### Use Cases

User
- list tasks
- view task
- change task status
- update task text
- change task priority
- delete task
- search tasks

TODO draw use cases diagram

## Technical Description

## Blocks

TODO draw blocks diagram

## Data Model

User
- id:ObjectId (automatico mongo)
- name: string
- email: string
- password: string

Task
- id: ObjectId (automatico mongo)
- user: ObjectId (ref: 'User')
- text: string
- createdAt: Date
- status: string (enum ['new', 'in progress', 'completed'])
- priority: string (enum ['high', 'medium', 'low'])

TODO draw data model diagram

Roadmap

Iteration 0

TODO figma
TODO data model
TODO implement mongoose schemas and models
TODO implement populate.js and play with data (create users and tasks)
TODO implement API logic
TODO implement App pages
TODO implement all basic user flows (register, login, home)
TODO implement other own logic related to tasks

Iteration 1

TODO ...