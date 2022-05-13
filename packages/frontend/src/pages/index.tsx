import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { LayoutMain } from 'widgets'

import { withPageLoading } from 'pages/lib/providers'

const HomePage = lazy(() => import('pages/home-page'))
const ExperimentsPage = lazy(() => import('pages/experiments-page'))

const routesCollection = {
    home: {
        basePath: '/',
        name: 'Главное меню',
    },
    experimentsList: {
        basePath: '/experiments',
        name: 'Результаты',
    },
}

const routes = [
    { path: '/', name: 'Главное меню', element: withPageLoading(HomePage) },
    // { path: '/', name: 'Главное меню', element: withPageLoading(ExperimentsPage) },
    {
        path: '/results',
        name: 'Результаты',
        element: withPageLoading(ExperimentsPage),
    },
]

function Routing() {
    const homeRoute = routes.find((route) => route.path === '/')

    return (
        <Routes>
            <Route path={homeRoute?.path} element={<LayoutMain />}>
                {routes.map((route) => (
                    // TODO: if route.path matches :exId than replace :exId with current experiment id
                    <Route
                        index={route.path === homeRoute?.path}
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
                <Route path="*" element={<div> Not found: 404 </div>} />
            </Route>
        </Routes>
    )
}

export { Routing, routesCollection, routes }
