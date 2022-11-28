import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

type Props = {
    message: string
    onDismiss?: () => any
}

const Error = ({ message, onDismiss }: Props) => {
    return <span className="text-red-600 flex items-center gap-2">
        <button title="Dismiss" onClick={onDismiss} className="text-red-300 focus:text-red-600 hover:text-red-600">
            <FontAwesomeIcon icon={solid('close')} />
        </button>
        <span>{message}</span>
    </span>
}

export default Error