import type { NextApiRequest, NextApiResponse } from 'next'
import { todoRepository } from 'redis/todo'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<null>
) {
  const completedTodos = await todoRepository
    .search()
    .where('isDone')
    .equals(true)
    .return.all()

  if (req.method === 'DELETE') {
    const removePromises: Promise<void>[] = completedTodos.map((todoItem) =>
      todoRepository.remove(todoItem.entityId)
    )

    await Promise.all(removePromises)

    res.status(200).send(null)
  }
}
