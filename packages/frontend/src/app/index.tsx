import { Routing } from 'pages'

import { withProviders } from 'app/providers'

import './index.css'

// TODO: find a more subtle way to solve @elastic/eui undefined regeneratorRuntime issue
// import 'regenerator-runtime/runtime'
import '@babel/runtime/regenerator'

/* resolving icons workaround: 
* https://github.com/elastic/eui/blob/main/wiki/consuming.md#failing-icon-imports
*/
import 'shared/config/eui-icons'

function App() {
    return <Routing />
}

export default withProviders(App)
