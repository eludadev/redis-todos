import type { Task, TaskSetter } from 'lib/types'
import { useState } from 'react'

export function useTasks(): {
    allTasks?: Task[]
    setTasks: TaskSetter
    isLoading?: boolean
    isError?: boolean
} {
    // TODO: fetch data from API. For now, we're defaulting to an empty list.
    const [data, mutate] = useState<Task[] | undefined>([])
    const error = false

    return {
        allTasks: data,
        setTasks: mutate,
        isLoading: !error && !data,
        isError: error,
    }
}
