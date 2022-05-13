import { ExperimentProvider } from 'features/experiment-runner'

function withExperimentState(component: () => React.ReactNode) {
    const Wrapper = () => <ExperimentProvider>{component()}</ExperimentProvider>
    Wrapper.displayName = `withExperimentState(${component.name})`
    return Wrapper
}
export { withExperimentState }
