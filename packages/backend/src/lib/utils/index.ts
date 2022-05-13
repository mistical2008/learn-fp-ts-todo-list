import { pipe } from 'fp-ts/function'
import { readFile } from 'fs/promises'
import {
    ServerToClientEvents,
    SocketIOType,
    WebsocketClientCmd,
    WebsocketMessage,
    WebsocketMessageSource,
} from '../../types'

function logStart(): void {
    console.log(`TEST STARTED`)
}

function logStop(): void {
    console.log(`TEST FINISHED`)
}

async function renderHtml(reply: any, path: string): Promise<void> {
    const data = await readFile(path, 'utf8')
    reply.header('content-type', 'text/html; charset=utf-8')
    reply.send(data)
}

function genRandFloat(min: number = 0, max: number = 1) {
    return () => Math.random() * (max - min) + min
}

function timerToInt(timer: NodeJS.Timer): number {
    return timer[Symbol.toPrimitive]()
}

function stopTimer(timerObj: NodeJS.Timer): () => void {
    return () => {
        // @ts-ignore
        pipe(timerObj, timerToInt, clearInterval)
    }
}

function runOnInterval({
    interval,
    run = console.log,
}: {
    interval: number
    run: (timerObject: NodeJS.Timer) => void
}): ReturnType<typeof stopTimer> {
    const timerObj = setInterval(() => {
        run(timerObj)
    }, interval)

    // @ts-ignore
    return stopTimer(timerObj)
}

function emitData(
    socket: SocketIOType,
    event: keyof ServerToClientEvents,
    msg: WebsocketMessage
) {
    socket.emit(event, msg)
}

function isClient(src: WebsocketMessageSource) {
    return src === 'client'
}

function isTestStart(cmd: WebsocketClientCmd) {
    return cmd === 'test:start'
}

function isTestStop(cmd: WebsocketClientCmd) {
    return cmd === 'test:stop'
}

export {
    genRandFloat,
    timerToInt,
    stopTimer,
    runOnInterval,
    logStart,
    logStop,
    emitData,
    renderHtml,
    isClient,
    isTestStart,
    isTestStop,
}
