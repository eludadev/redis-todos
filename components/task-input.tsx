import { useState, useEffect, useRef } from "react"

type Props = {
    onSubmit?: (taskText: string) => any
    isDisabled?: boolean
}

const TaskInput = ({ onSubmit, isDisabled }: Props) => {
    const [task, setTask] = useState<string>('')
    const inputElement = useRef<HTMLInputElement | null>(null)

    // Automatically focus input when app loads
    useEffect(() => {
        inputElement.current?.focus()
    }, [inputElement])

    return <form onSubmit={(event) => {
        event.preventDefault()
        onSubmit && onSubmit(task)
        setTask('')
    }}>
        <input value={task} onChange={(event) => setTask(event.target.value)} ref={inputElement} disabled={isDisabled} placeholder="What needs to be done?" className="block mt-2 w-full x-4 pl-4 py-2 border-2 border-stone-200 shadow-sm focus:border-stone-300 !shadow-stone-200 !outline-none placeholder-stone-400" />
    </form>
}

export default TaskInput