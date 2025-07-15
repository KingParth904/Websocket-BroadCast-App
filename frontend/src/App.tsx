import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [joinedRoom, setJoinedRoom] = useState<string | null>(null);
  const roomInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data]);
    };

    return () => ws.close();
  }, []);

  const joinRoom = () => {
    const roomId = roomInputRef.current?.value.trim();
    if (!roomId) return;

    setJoinedRoom(roomId);

    wsRef.current?.send(JSON.stringify({
      type: "join",
      payload: { roomId }
    }));
  };

  const sendMessage = () => {
    const message = messageInputRef.current?.value.trim();
    if (!message || !joinedRoom) return;

    wsRef.current?.send(JSON.stringify({
      type: "chat",
      payload: { message }
    }));

    messageInputRef.current.value = "";
  };

  if (!joinedRoom) {
    return (
      <div className="h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl mb-4">Join a Room</h1>
        <input
          ref={roomInputRef}
          type="text"
          placeholder="Enter room name…"
          className="p-2 rounded text-black placeholder-gray-400 text-white"
        />
        <button
          onClick={joinRoom}
          className="bg-purple-600 mt-2 px-4 py-2 rounded"
        >
          Join
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="flex-1 bg-red-300 overflow-y-auto p-2">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className="bg-white text-black rounded p-2 w-fit m-1"
          >
            {message}
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-800 text-white">
        <input
          ref={messageInputRef}
          type="text"
          placeholder="Type message…"
          className="w-full p-2 rounded  placeholder-red-500 text-amber-400"
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm mt-2"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export default App;
