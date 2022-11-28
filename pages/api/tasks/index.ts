import type { NextApiRequest, NextApiResponse } from 'next'
import { todoRepository } from 'redis/todo'
import type { Task } from 'lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task | Task[]>
) {
  if (req.method === 'GET') {
    const todos = await todoRepository.search().return.all()
    const tasks: Task[] = todos.map((todo) => {
      const todoId = todo.entityId

      return {
        id: todoId,
        task: todo.task,
        isDone: todo.isDone,
        dateCreated: todo.dateCreated,
      }
    })

    res.send(tasks)
  } else if (req.method === 'POST') {
    // Extract data from request
    const taskText = req.body.task
    const dateCreated = new Date().toISOString()

    // Create the todo item
    const todo = await todoRepository.createAndSave({
      task: taskText,
      isDone: false,
      dateCreated,
    })

    res.send({
      id: todo.entityId,
      task: taskText,
      isDone: false,
      dateCreated,
    })
  }
}
