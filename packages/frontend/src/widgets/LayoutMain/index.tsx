import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageHeader,
    EuiPageSideBar,
    EuiButton,
} from '@elastic/eui'
import { Outlet } from 'react-router-dom'

import { TreeView } from 'shared/ui'

function LayoutMain() {
    return (
        <EuiPage style={{ height: '100vh' }}>
            <EuiPageSideBar>
                <TreeView />
            </EuiPageSideBar>
            <EuiPageBody>
                <EuiPageHeader
                    iconType="logoElastic"
                    pageTitle="Page title"
                    rightSideItems={[
                        <EuiButton key="1" fill>
                            Add something
                        </EuiButton>,
                        <EuiButton key="2">Do something</EuiButton>,
                    ]}
                />
                <EuiPageContent>
                    <Outlet />
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    )
}

export { LayoutMain }
