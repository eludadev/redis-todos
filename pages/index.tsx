import { useMemo, useState } from 'react'
import AppNav from 'components/app-nav'
import TaskInput from 'components/task-input'
import TaskItem from 'components/task-item'
import Loader from 'components/loader'
import Error from 'components/error'
import { useTasks } from 'hooks/tasks'
import type { Task } from 'lib/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { randomNumber, setTaskLoadingState } from 'lib/utils'
import axios from 'axios'

export default function Home() {
  const { allTasks, setTasks, isLoading, isError } = useTasks()

  /* Filter allTasks using categories */
  const allFilters = ['All', 'Active', 'Completed']
  const [appliedFilter, setFilter] = useState<string>('All')
  const filteredTasks = useMemo<Task[] | null>(() => {
    if (!allTasks) return null

    switch (appliedFilter) {
      case 'Active':
        return allTasks.filter((task) => !task.isDone)
      case 'Completed':
        return allTasks.filter((task) => task.isDone)
      default:
        return allTasks
    }
  }, [appliedFilter, allTasks])

  /* Sort filteredTasks by date (newest to oldest) */
  const sortedTasks = useMemo<Task[] | null>(() => {
    if (!filteredTasks) return null

    return filteredTasks.sort((taskA, taskB) => {
      const dateA = new Date(taskA.dateCreated)
      const dateB = new Date(taskB.dateCreated)

      return dateA < dateB ? 1 : dateA > dateB ? -1 : 0
    })
  }, [filteredTasks])

  /* Display at most one dismissable error message. */
  const [error, setError] = useState<string | null>(null)
  function closeError() {
    setError(null)
  }

  /* Update the contents of an existing task. */
  async function updateTask(id: string, newTask: Task) {
    setTaskLoadingState(setTasks, id, true)
    // Send API Request
    const { status } = await axios({
      url: `/api/tasks/${id}`,
      method: 'PUT',
      data: {
        task: newTask.task,
        isDone: newTask.isDone
      }
    })

    // Stop loading state.
    setTaskLoadingState(setTasks, id, false)

    // If success, update todo item
    if (status === 200) {
      setTasks(tasks => tasks && tasks.map(task => task.id === id ? newTask : task))
    } else {
      // If error, don't update task.
      setError('Failed to update task.')
    }
  }

  /* Delete an existing task. */
  async function deleteTask(id: string) {
    setTaskLoadingState(setTasks, id, true)

    // Send API Request
    const { status } = await axios({
      url: `/api/tasks/${id}`,
      method: 'DELETE'
    })

    // Stop loading state
    setTaskLoadingState(setTasks, id, false)

    // If success, delete todo item
    if (status === 200) {
      setTasks(tasks => tasks && tasks.filter(task => task.id !== id))
    } else {
      // If errror, don't delete todo item
      setError('Failed to delete task.')
    }
  }

  /* Create a new task. */
  async function createTask(taskText: string) {
    // Create a temporary id while the item is being created.
    const temporaryId = `TEMPORARY-${randomNumber()}`
    setTasks(tasks => tasks && tasks.concat([{
      task: taskText,
      id: temporaryId,
      isDone: false,
      isLoading: true, // The new task starts with a loading state
      dateCreated: (new Date()).toISOString()
    }]))

    // Send API request
    const { data, status } = await axios({
      url: '/api/tasks',
      method: 'POST',
      data: {
        task: taskText
      }
    })

    // Stop loading state
    setTaskLoadingState(setTasks, temporaryId, false)

    // If success, update todo item with real id
    if (status === 200) {
      const id = data.id as string
      const dateCreated = data.dateCreated as string
      setTasks(tasks => tasks && tasks.filter(task => task.id === temporaryId ? { ...task, id, dateCreated } : task))
    } else {
      // If error, delete todo item
      setTasks(tasks => tasks && tasks.filter(task => task.id !== temporaryId))
      setError('Failed to create task.')
    }
  }

  /* Clear all completed tasks, and track a separate loading state for this action. */
  const [isClearing, setClearing] = useState<boolean>(false)
  async function clearCompleted() {
    setClearing(true)

    // Send API request
    const { status } = await axios({
      url: '/api/tasks/completed',
      method: 'DELETE'
    })

    // Stop loading state
    setClearing(false)

    // If success, delete completed tasks
    if (status === 200) {
      setTasks(tasks => tasks && tasks.filter(task => !task.isDone))
    } else {
      // If error, don't delete tasks
      setError('Faled to clear completed tasks.')
    }
  }

  if (isLoading) return (
    <div className="mt-8 w-fit mx-auto">
      <Loader isVisible={true} />
    </div>
  )

  if (isError || !sortedTasks) return (
    <div className="mt-8 w-fit mx-auto text-red-600">
      <FontAwesomeIcon icon={solid('warning')} /> Failed to load data.
    </div>
  )

  return <div>
    <section className="bg-white shadow-sm shadow-stone-200">
      <TaskInput onSubmit={(taskText) => createTask(taskText)} isDisabled={appliedFilter === 'Completed'} />

      <main className="border-x-2 border-stone-200">
        <ul>
          {sortedTasks.map((task) => <li key={task.id}><TaskItem task={task} onCheck={(isDone) => updateTask(task.id, { ...task, isDone })} onUpdate={(taskText) => updateTask(task.id, { ...task, task: taskText })} onDelete={() => deleteTask(task.id)} /></li>)}
        </ul>
      </main>

      <header className="px-3 py-2 flex items-center justify-between">
        <p className="text-xs font-light">{sortedTasks.length} item{sortedTasks.length === 1 ? '' : 's'} left</p>
        <AppNav allFilters={allFilters} appliedFilter={appliedFilter} onFilterChange={(filter) => setFilter(filter)} />
        <button onClick={clearCompleted} disabled={isClearing} className="text-xs hover:underline focus:underline disabled:text-stone-400 !outline-none">Clear completed</button>
      </header>
    </section>

    {isClearing && <aside>
      <div className="flex items-center gap-1 mt-4 px-2 rounded-md border-2 border-primary-400"><Loader isVisible={true} /> Clearing completed tasks...</div>
    </aside>}

    {error && <div className="mt-4 px-2"><Error message={error} onDismiss={() => closeError()} /></div>}
  </div>
}