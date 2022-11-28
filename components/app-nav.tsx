import classnames from 'classnames'

type Props = {
    allFilters: string[]
    appliedFilter: string
    onFilterChange?: (filter: string) => any
}

const AppNav = ({ allFilters, appliedFilter, onFilterChange }: Props) => {
    return <nav>
        <ul className="flex items-center gap-3">
            {allFilters.map(filter => <li key={filter} className="text-xs"><button onClick={() => onFilterChange && onFilterChange(filter)} className={classnames('px-1 ring-1 ring-offset-1 ring-transparent focus:ring-primary-300 hover:ring-primary-300 !outline-none', { '!ring-primary-500': filter === appliedFilter })}>{filter}</button></li>)}
        </ul>
    </nav>
}

export default AppNav