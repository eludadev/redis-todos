import type { NextApiRequest, NextApiResponse } from 'next'
import { todoRepository } from 'redis/todo'
import type { Task } from 'lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task | null>
) {
  const taskId = req.query.id as string

  if (req.method === 'PUT') {
    // Extract request data
    const taskText = req.body.task as string
    const taskIsDone = req.body.isDone as boolean

    // Fetch the todo item
    const todo = await todoRepository.fetch(taskId)

    // Update the todo item
    todo.task = taskText
    todo.isDone = taskIsDone
    await todoRepository.save(todo)

    res.send({
      id: taskId,
      task: taskText,
      isDone: taskIsDone,
      dateCreated: todo.dateCreated,
    })
  } else if (req.method === 'DELETE') {
    await todoRepository.remove(taskId)
    res.status(200).send(null)
  }
}
