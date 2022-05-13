import { Button } from 'antd'

type Props = {
    isOn: boolean
    onClick: () => void
    toggledText?: string
    untoggledText?: string
}

function ToggleButton({
    isOn,
    onClick,
    toggledText = 'Стоп',
    untoggledText = 'Старт',
}: Props) {
    return (
        <Button
            type={isOn ? 'default' : 'primary'}
            shape="round"
            size="large"
            onClick={onClick}
        >
            {isOn ? toggledText : untoggledText}
        </Button>
    )
}

export { ToggleButton }
