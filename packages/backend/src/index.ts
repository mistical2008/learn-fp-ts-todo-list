import fastify from 'fastify'
import fastifyIO from 'fastify-socket.io'
import path from 'path'
import {
    emitData,
    genRandFloat,
    isClient,
    isTestStart,
    isTestStop,
    logStart,
    logStop,
    renderHtml,
    runOnInterval,
    stopTimer,
    timerToInt,
} from './lib/utils'
import 'dotenv/config'
import { nanoid } from 'nanoid'
import { NanoId, SocketIOServerType } from '@app/types'

const port = process.env.BACKEND_PORT || 7777
const server = fastify()
const genRandFload10to100 = genRandFloat(10, 100)
const intervals = [10, 200]
const sensors = intervals.map((_i) => {
    return nanoid()
})

server.register(fastifyIO, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
    },
})

function sendSensorsData(socket: SocketIOServerType, sensorId: NanoId): void {
    emitData(socket, 'message', {
        payload: {
            sensorId,
            timestamp: Date.now(),
            value: genRandFload10to100(),
        },
        cmd: 'data',
        source: 'server',
    })
}
server.get('/server-test', (_req, reply) => {
    server.io.emit('hello')

    console.log('hello')
    renderHtml(reply, path.resolve(__dirname, './index.html'))
})

server.ready().then(() => {
    server.io.on('connection', (socket) => {
        const clearTimerFns: ReturnType<typeof stopTimer>[] = []
        const intervals = [1500, 2000]

        socket.on('message', ({ cmd, source }) => {
            if (isClient(source) && isTestStop(cmd)) {
                clearTimerFns.forEach((clearTimer) => {
                    clearTimer()
                })
                clearTimerFns.length = 0
                logStop()
            }
            if (isClient(source) && isTestStart(cmd)) {
                logStart()

                intervals.forEach((interval, idx) => {
                    const sensorId = sensors[idx]

                    const clearTimerFn = runOnInterval({
                        run: (_timerObj) => {
                            sendSensorsData(socket, sensorId)
                            console.log({ timer: timerToInt(_timerObj) })
                        },
                        interval,
                    })
                    clearTimerFns.push(clearTimerFn)
                })
            }
        })
    })

    server.io.on('disconnect', (_socket) => {
        console.log('disconnect')
    })
})

server.listen(port, () => console.log(`server listening on ${port}`))
