import { atom, atomFamily, selector, selectorFamily } from 'recoil'

import consoleConf from 'shared/config/console'

import { WebsocketMessage } from '@app/types'

type ExperimentStatus = 'idle' | 'started' | 'stopped'

/**
 * Utils
 */
function findItemById<T, D>(array: T[], id: D): T | undefined {
    return array.find((item) => item.id === id)
}

/**
 * Atom effects
 */
const localStorageEffect =
    (key: string) =>
    ({
        setSelf,
        onSet,
    }: {
        setSelf: (arg: unknown) => void
        onSet: (arg: unknown) => void
    }) => {
        const savedValue = localStorage.getItem(key)
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue))
        }

        onSet((newValue: unknown, _: unknown, isReset: unknown) => {
            isReset
                ? localStorage.removeItem(key)
                : localStorage.setItem(key, JSON.stringify(newValue))
        })
    }

/**
 * States
 */
const status = atom<ExperimentStatus>({
    key: 'status',
    default: 'idle',
    effects: [
        ({ onSet }) => {
            onSet((status) => {
                console.debug(
                    '%cCurrent status:',
                    consoleConf.styles.stateActions.experiment.status,
                    status
                )
            })
        },
    ],
})

const isStarted = selector({
    key: 'isStarted',
    get: ({ get }) => {
        const state = get(status)
        return state === 'idle' || state === 'stopped' ? false : true
    },
})

const experimentDataset = atom<WebsocketMessage['payload'][]>({
    key: 'dataset',
    default: [],
    effects: [
        ({ onSet }) => {
            onSet((data) => {
                console.debug(
                    '%cDATASET: %o',
                    consoleConf.styles.stateActions.experiment.dataset,
                    data
                )
            })
        },
        localStorageEffect('dataset'),
    ],
})

const datasetBySensors = selector({
    key: 'datasetBySensors',
    get: ({ get }) => {
        const dataset = get(experimentDataset)
        const sensors = dataset
            .map((payload) => payload?.sensorId)
            .filter(Boolean)

        return sensors.reduce((acc, id) => {
            acc[id] = dataset.filter(({ sensorId }) => id === sensorId)
            return acc
        }, {})
    },
})

type ExperimentId = number

type Experiment = {
    id: ExperimentId
    createdAt: Date
    dataset: WebsocketMessage['payload'][]
}

type ExperimentsList = {
    list: Experiment[] | []
    currentId: ExperimentId | null
    lastId: ExperimentId | null
}

const experiments = atom<ExperimentsList>({
    key: 'experiments',
    default: {
        list: [],
        currentId: null,
        lastId: null,
    },
    effects: [
        ({ onSet }) => {
            onSet((experiments) => {
                console.debug(
                    '%cExperiments: %o',
                    consoleConf.styles.stateActions.experiment,
                    experiments
                )
            })
        },
        localStorageEffect('experiments'),
    ],
})

const experiment = atomFamily({
    key: 'experiment',
    default: selectorFamily({
        key: 'experiment/default',
        get:
            (id) =>
            ({ get }) => {
                const experimentsList = get(experiments)
                const experiment = findItemById(experimentsList.list, id)
                return experiment ?? null
            },
    }),
})

export {
    status,
    isStarted,
    experimentDataset,
    datasetBySensors,
    experiments,
    experiment,
}
