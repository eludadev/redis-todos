type Props = {
    isVisible?: boolean
}

const Loader = ({ isVisible }: Props) => {
    const width = 30
    const height = 30
    const color = "#f59e0b"
    const strokeWidth = 4

    // Credits: https://github.com/mhnpd/react-loader-spinner/blob/master/src/loader/RotatingSquare.tsx
    return <span className={isVisible ? 'opacity-100' : 'opacity-0'}>
        <div
            className="flex"
            aria-label="Loading"
            aria-busy={true}
            role="status"
        >
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enableBackground="new 0 0 100 100"
                height={`${height}`}
                width={`${width}`}
                data-testid="rotating-square-svg"
                xmlSpace="preserve"
            >
                <rect
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    x="25"
                    y="25"
                    width="50"
                    height="50"
                >
                    <animateTransform
                        attributeName="transform"
                        dur="0.5s"
                        from="0 50 50"
                        to="180 50 50"
                        type="rotate"
                        id="strokeBox"
                        attributeType="XML"
                        begin="rectBox.end"
                    />
                </rect>
                <rect x="27" y="27" fill={color} width="46" height="50">
                    <animate
                        attributeName="height"
                        dur="1.3s"
                        attributeType="XML"
                        from="50"
                        to="0"
                        id="rectBox"
                        fill="freeze"
                        begin="0s;strokeBox.end"
                    />
                </rect>
            </svg>
        </div>
    </span>
}

export default Loader