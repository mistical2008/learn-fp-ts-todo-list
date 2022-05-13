import { EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function HomePage() {
    const [count, setCount] = useState(0)

    return (
        <EuiFlexGroup
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="eui-fullHeight"
            responsive={false}
            gutterSize="s"
        >
            <EuiButton fill onClick={() => setCount(count + 1)}>
                count: {count}
            </EuiButton>
            <EuiButton className="eui-alignMiddle" onClick={() => setCount(0)}>
                Reset count
            </EuiButton>

            <Link to="/results">Результаты</Link>
        </EuiFlexGroup>
    )
}

export default HomePage
