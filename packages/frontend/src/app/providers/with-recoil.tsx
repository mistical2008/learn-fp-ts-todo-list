import { RecoilRoot } from 'recoil'

function withRecoil(component: () => React.ReactNode) {
    const Wrapper = () => <RecoilRoot>{component()}</RecoilRoot>
    Wrapper.displayName = `withRecoil(${component.name})`

    return Wrapper
}
export { withRecoil }
