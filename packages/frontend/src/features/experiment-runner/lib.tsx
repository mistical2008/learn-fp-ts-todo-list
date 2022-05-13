import { createContext, useContext, useEffect, useMemo } from 'react'

import { useSession } from 'shared/api/websocket'

import {
    status,
    isStarted,
    experimentDataset,
} from 'features/experiment-runner'

import { WebsocketMessage } from '@app/types'

import { datasetBySensors } from './model'
import { DatasetBySensors } from './types'

interface StateContext {
    started: boolean
    dataset: WebsocketMessage['payload'][]
    datasetBySensors: DatasetBySensors
}

interface ActionsContext {
    start: () => void
    stop: () => void
    toggle: () => void
}

const ExperimentStateContext = createContext<StateContext | null>(null)
ExperimentStateContext.displayName = 'ExperimentStateContext'

const ExperimentActionsContext = createContext<ActionsContext | null>(null)
ExperimentActionsContext.displayName = 'ExperimentActionsContext'

function ExperimentProvider({
    children,
}: React.PropsWithChildren<Record<string, unknown>>) {
    const { connect, close, sendMessage } = useSession(
        () => {
            console.log('Connected to websocket')
        },
        (data) => setDataset([...dataset, data.payload]),
        () => console.log('Connection closed')
    )
    const start = () => {
        sendMessage({ source: 'client', cmd: 'test:start' })
    }
    const stop = () => {
        sendMessage({ source: 'client', cmd: 'test:stop' })
    }
    const toggle = () => {
        if (true) {
            stop()
        } else {
            start()
        }
    }

    useEffect(() => {
        connect()
        return () => {
            close()
        }
    }, [])

    const stateActions = useMemo<ActionsContext>(
        () => ({
            start,
            stop,
            toggle,
        }),
        [toggle, start, stop]
    )
    const stateValues = useMemo<StateContext>(
        () => ({
            started: 'not implemented'
            // started,
            // dataset,
            // datasetBySensors: bySensors,
        }),
        []
    )

    return (
        <ExperimentStateContext.Provider value={stateValues}>
            <ExperimentActionsContext.Provider value={stateActions}>
                {children}
            </ExperimentActionsContext.Provider>
        </ExperimentStateContext.Provider>
    )
}

function useExperimentActions() {
    const context = useContext(ExperimentActionsContext)
    if (!context) {
        throw new Error(
            `hook 'useExperimentActions' must be used withing the 'ExperimentActionsContext'`
        )
    }
    return context
}

function useExperimentState() {
    const context = useContext(ExperimentStateContext)
    if (!context) {
        throw new Error(
            `hook 'useExperimentState' must be used withing the 'ExperimentStateContext'`
        )
    }
    return context
}

export { ExperimentProvider, useExperimentActions, useExperimentState }
