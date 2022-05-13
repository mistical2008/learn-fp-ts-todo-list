import { BrowserRouter } from 'react-router-dom'

function withRouter(component: () => React.ReactNode) {
    const Wrapper = () => <BrowserRouter>{component()}</BrowserRouter>
    Wrapper.displayName = `withRouter(${component.name})`

    return Wrapper
}
export { withRouter }
