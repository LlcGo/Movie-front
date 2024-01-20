let url = 'ws://localhost:7530/chat';

interface socket {
    websocket: any
    init: () => any
    send: (e: any) => void
}


 const socket: socket = {
    websocket: null,
    init: () => {
        socket.websocket = new WebSocket(url);
        socket.websocket.onmessage = (e: any) => {
            console.log('接收到的数据', e)
        }
        socket.websocket.onclose = (e: any) => {
            console.log(e, 'websocket关闭')
        }
    },
    send: (e) => {
        // if (socket.websocket.readyState == 0) {
        //     setTimeout(() => {
        //         socket.websocket.send(JSON.stringify(e))
        //     }, 1000)
        // } else {
            console.log('发送的消息',e)
            socket.websocket.send(JSON.stringify(e))
        // }
    },
}

export default socket;


