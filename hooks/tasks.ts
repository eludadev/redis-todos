import useSWR from 'swr'
import type { Task, TaskSetter } from 'lib/types'

async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
}

export function useTasks(): {
    allTasks?: Task[]
    setTasks: TaskSetter
    isLoading?: boolean
    isError?: boolean
} {
    const { data, error, mutate } = useSWR<Task[], boolean>(
        '/api/tasks',
        fetcher
    )

    return {
        allTasks: data,
        setTasks: mutate,
        isLoading: !error && !data,
        isError: error,
    }
}
