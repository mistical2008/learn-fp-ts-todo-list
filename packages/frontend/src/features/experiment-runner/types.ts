import { WebsocketMessage } from '@app/types'

type DatasetBySensors = Record<string, WebsocketMessage['payload'][]>

export { DatasetBySensors }
