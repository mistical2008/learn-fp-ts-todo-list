import { useCallback, useEffect, useState, EffectCallback } from 'react'
import { io, Socket } from 'socket.io-client'

import { websocketConfig } from 'shared/config/websocket'

import { WebsocketMessage, WebsocketMessageHandler } from '@app/types'

function useSession(
    onOpen: WebsocketMessageHandler,
    onMessage: WebsocketMessageHandler,
    onClose: WebsocketMessageHandler
) {
    const [session, setSession] = useState(null as unknown as Socket)

    type CreateHandlerArgs = {
        event: any
        handler: typeof onMessage
    }

    const createSocketIOHandler = ({
        event,
        handler,
    }: CreateHandlerArgs): EffectCallback => {
        //  @ts-expect-error
        return () => {
            if (!session) return
            session.on(event, handler)

            return () => session.off(event, handler)
        }
    }

    const updateOpenHandler = createSocketIOHandler({
        event: 'connect',
        handler: onOpen,
    })

    const updateMessageHandler = createSocketIOHandler({
        event: 'message',
        handler: onMessage,
    })

    const updateCloseHandler = createSocketIOHandler({
        event: 'disconnect',
        handler: onClose,
    })

    useEffect(updateOpenHandler, [session, onOpen])
    useEffect(updateMessageHandler, [session, onMessage])
    useEffect(updateCloseHandler, [session, onClose])

    const connect = useCallback(() => {
        const ws = io(websocketConfig.baseUrl)
        setSession(ws)
    }, [])

    const sendMessage = (msg: WebsocketMessage) => {
        session.send(msg)
    }

    const close = useCallback(() => {
        if (session.connected) session.close()
    }, [session])

    return { connect, sendMessage, close }
}

export { useSession }
