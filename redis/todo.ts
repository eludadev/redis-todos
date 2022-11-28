import { Entity, Schema } from 'redis-om'
import client from 'redis/client'

interface Todo {
  task: string
  isDone: boolean
  dateCreated: string
}

class Todo extends Entity {}

const todoSchema = new Schema(Todo, {
  task: { type: 'string' },
  isDone: { type: 'boolean' },
  dateCreated: { type: 'date' },
})

export const todoRepository = client.fetchRepository(todoSchema)

await todoRepository.createIndex()
