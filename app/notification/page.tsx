"use client"

import { useCallback, useState } from "react";
import { SOCKET_EMIT_TYPES } from "./constants/SocketConst";
import useSocketHook from "./hooks/useSocketHook";
import { SOCKET_DATA, SOCKET_MSG } from "./types/SocketTypes";

export default function NotificationSystem() {
  const [notifications, setNotification] = useState<Record<number, SOCKET_DATA>>({});

  const onSocketResponse = useCallback((type: SOCKET_MSG, value: SOCKET_DATA) => {
    console.log('111231', type)
    const hash = Date.now();
    setNotification((prev) => {
      return { ...prev, [hash]: value };
    });
    const timeoutid = setTimeout(() => {
      clearTimeout(timeoutid);
      setNotification((prev) => {
        console.log('dee', hash, prev)
        const old = structuredClone(prev);
        delete old[hash];
        return old;
      });
    }, 3000);
  }, []);

  const { emitSocketMsg } = useSocketHook(onSocketResponse);

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
          ? Object.entries(notifications).map(([id, value]) => {
              return (
                <div key={id} style={{ padding: "20px", border: "1px solid greed" }}>
                  {String(value)}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
