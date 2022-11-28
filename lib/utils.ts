import { Task, TaskSetter } from 'lib/types'

export function setTaskLoadingState(
    setTasks: TaskSetter,
    id: string,
    isLoading: boolean
) {
    setTasks(
        (tasks) =>
            tasks &&
            tasks.map((task) =>
                task.id === id ? { ...task, isLoading } : task
            )
    )
}

// Returns a random integer between 100 and 200
export function randomNumber(): number {
    return Math.round(Math.random() * 100) + 100
}
