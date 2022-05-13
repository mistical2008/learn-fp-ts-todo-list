import { Socket } from "socket.io";

type NanoId = string;
type WebsocketServerCmd = "data";
type WebsocketClientCmd = "test:start" | "test:stop";
type WebsocketCmd = WebsocketServerCmd | WebsocketClientCmd;
type WebsocketMessageSource = "server" | "client";

type WebsocketMessagePayload = {
  sensorId: NanoId;
  timestamp: number;
  value: number;
};

type WebsocketMessage = {
  source: WebsocketMessageSource;
  cmd: WebsocketCmd;
  payload?: WebsocketMessagePayload;
};

type WebsocketMessageHandler = (message: WebsocketMessage) => void;

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  sensorId: string;
}

interface ServerToClientEvents {
  message: WebsocketMessageHandler;
}

interface ClientToServerEvents {
  message: WebsocketMessageHandler;
}

type SocketIOServerType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
type SocketIOClientType = Socket<ServerToClientEvents, ClientToServerEvents>;

export type {
  WebsocketCmd,
  WebsocketMessage,
  WebsocketMessagePayload,
  WebsocketServerCmd,
  WebsocketClientCmd,
  WebsocketMessageHandler,
  WebsocketMessageSource,
  ServerToClientEvents,
  ClientToServerEvents,
  SocketIOClientType,
  SocketIOServerType,
  NanoId,
};
