import { useEffect, useRef, useState } from "react"
import Loader from "components/loader"
import type { Task } from "lib/types"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

type Props = {
    task: Task
    onCheck?: (isDone: boolean) => any
    onUpdate?: (taskText: string) => any
    onDelete?: () => any
}

const TaskItem = ({ task: { task, isDone, isLoading }, onCheck, onUpdate, onDelete }: Props) => {
    const [isEditing, setEditing] = useState<boolean>(false)
    const [editedTask, setEdit] = useState<string>(task)
    const editInputElement = useRef<HTMLInputElement | null>(null)

    // Automatically focus the input element when editing
    useEffect(() => {
        isEditing && editInputElement.current?.focus()
    }, [isEditing])

    async function applyEdit() {
        onUpdate && await onUpdate(editedTask)
        setEditing(false)
    }

    if (isEditing) return <form className={'flex items-center justify-between px-2 py-2 border-b-2 border-stone-200 shadow-inner shadow-stone-400/40'} onSubmit={(event) => {
        event.preventDefault()
        applyEdit()
    }}>
        <input ref={editInputElement} disabled={isLoading} className={'w-full h-full grow py-2 pl-8 pr-2 outline-none ring-0'} value={editedTask} onChange={(event) => setEdit(event.target.value)} />
        <Loader isVisible={isLoading} />
    </form>

    return <label className={classNames({ 'bg-stone-100 opacity-50': isLoading }, 'group flex items-center justify-between gap-2 px-2 py-2 border-b-2 border-stone-200')} >
        <input type="checkbox" disabled={isLoading} checked={isDone} onChange={() => onCheck && onCheck(!isDone)} className="self-start mt-2 rounded-full border-stone-200 focus:border-stone-300 text-primary-500 focus:text-primary-600 !ring-0 !ring-transparent" />

        <span className={classNames(isDone ? 'text-stone-400 line-through' : 'text-stone-600', 'grow')}>{task}</span>

        <span className={'self-start'}>
            <Loader isVisible={isLoading} />
        </span>

        {!isLoading && <div className={'flex gap-1 self-start mt-1'}>
            <button title="Edit" disabled={isLoading} onClick={() => setEditing(true)}>
                <FontAwesomeIcon icon={solid('pen')} className={'px-1 py-1 text-stone-200 hover:text-stone-600'} />
            </button>
            <button title="Delete" disabled={isLoading} onClick={() => onDelete && onDelete()}>
                <FontAwesomeIcon icon={solid('close')} className={'px-1 py-1 text-stone-200 hover:text-stone-600'} />
            </button>
        </div>}
    </label >
}

export default TaskItem