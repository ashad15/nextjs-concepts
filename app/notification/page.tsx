"use client"

import { useState } from "react";
import { SOCKET_EMIT_TYPES } from "./constants/SocketConst";
import useSocketHook from "./hooks/useSocketHook";
import { SOCKET_DATA, SOCKET_MSG } from "./types/SocketTypes";

export default function NotificationSystem() {
  const { emitSocketMsg } = useSocketHook(onSocketResponse);
  const [notifications, setNotification] = useState<Record<number, any>>({});

  function onSocketResponse(type: SOCKET_MSG, value: SOCKET_DATA) {
    console.log('111231')
    let hash = Date.now();
    setNotification((prev) => {
      return { ...prev, [hash]: value };
    });
    let timeoutid = setTimeout(() => {
      clearTimeout(timeoutid);
      setNotification((prev) => {
        console.log('dee', hash, prev)
        let old = structuredClone(prev);
        delete old[hash];
        return old;
      });
    }, 3000);
  }

  const emitSomeMsg = () => {
    const random = Math.floor(Math.random() * SOCKET_EMIT_TYPES.length);
    emitSocketMsg(SOCKET_EMIT_TYPES[random], "some valueee");
  };

  return (
    <div>
      <h1>heyyyy thereee</h1>
      <button onClick={emitSomeMsg}> clicke me to pill</button>
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "0px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {notifications && Object.keys(notifications)?.length
          ? Object.values(notifications).map((value) => {
              return (
                <div style={{ padding: "20px", border: "1px solid greed" }}>
                  {value}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
