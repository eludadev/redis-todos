export type Task = {
  id: string
  task: string
  dateCreated: string
  isDone?: boolean
  isLoading?: boolean
}

export type TaskSetter = (callback: (tasks: Task[] | undefined) => Task[] | undefined) => void