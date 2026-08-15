"use client";

import { io, Socket } from "socket.io-client";
import { SOCKET_EMIT_TYPES, SOCKETURL } from "../constants/SocketConst";
import { useEffect, useRef } from "react";
import { SOCKET_DATA, SOCKET_MSG } from "../types/SocketTypes";

export default function useSocketHook(
  onSocketResponse: (type: SOCKET_MSG, data: SOCKET_DATA) => void,
) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKETURL);

    socket.on("connect", () => {
      socketRef.current = socket;
      console.log("connect");
    });
    console.log('aa')

    SOCKET_EMIT_TYPES.forEach((type) => {
      socket.on(type, (data: SOCKET_DATA) => {
        onSocketResponse(type, data);
      });
    });
    return(() => {
        socketRef?.current?.disconnect()
    })
  }, [onSocketResponse]);

  const emitSocketMsg = (msg: SOCKET_MSG, data: SOCKET_DATA) => {
    socketRef?.current?.emit(msg, data);
  };

  return { emitSocketMsg };
}
