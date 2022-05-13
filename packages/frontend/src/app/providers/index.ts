import { flow } from 'fp-ts/function'

import { withEui } from 'app/providers/with-eui'
import { withReactQuery } from 'app/providers/with-react-query'
import { withRouter } from 'app/providers/with-router'
import { withErrorBoundary } from 'shared/lib/hoc'

export const withProviders = flow(
    withErrorBoundary,
    withRouter,
    withReactQuery,
    withEui
)
