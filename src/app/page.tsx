"use client";

import { useState, useEffect } from "react";
import { socket } from "./socket";

export default function Home() {
  const [content, setContent] = useState("dsfsfsd");
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("update-change", (data) => {
      console.log(data);
      setContent(JSON.parse(data));
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <main>
      <div>
        <p>Status: {isConnected ? "connected" : "disconnected"}</p>
        <p>Transport: {transport}</p>
      </div>

      <textarea
        className="border border-green-600 min-h-80 m-4 w-[90%]"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          socket.emit("value-change", JSON.stringify(e.target.value));
        }}
      ></textarea>
    </main>
  );
}
