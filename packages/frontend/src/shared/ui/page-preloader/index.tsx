import { EuiLoadingSpinner } from '@elastic/eui'

function PagePreloader() {
    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <EuiLoadingSpinner size="xl" />
        </div>
    )
}

export { PagePreloader }
