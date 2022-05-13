import { EuiProvider } from '@elastic/eui'

function withEui(component: () => React.ReactNode) {
    const Wrapper = () => <EuiProvider colorMode="light">{component()}</EuiProvider>
    Wrapper.displayName = `withEui(${component.name})`
    return Wrapper
}
export { withEui }
