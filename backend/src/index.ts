import { WebSocketServer, WebSocket } from "ws";
import http from "http";

const server = http.createServer();

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ server });

interface User{
    socket : WebSocket;
    room : string;
}

let allSockets: User[] = [];

wss.on("connection",(socket)=>{
    

    socket.on("message",(message)=>{
        const parsedMessage = JSON.parse(message as unknown as string);

        if(parsedMessage.type ==="join"){
            console.log("user joined room "+ parsedMessage.payload.roomId)
            allSockets.push({
                socket,
                room:parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type === "chat"){
            console.log("user wants to chat");
            const currentUserroom = allSockets.find((x)=>x.socket==socket)?.room
            if(!currentUserroom){
                console.log("User has not yet joined a room");
                return;
            }
            allSockets.filter((user)=>user.room == currentUserroom).forEach((user)=> user.socket.send(parsedMessage.payload.message))

        }
        
     })

     socket.on("close",()=>{
        allSockets = allSockets.filter((x)=> x.socket !== socket)


     })
})  
