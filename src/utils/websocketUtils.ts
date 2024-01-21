import {chatMsg} from "../page/typeEnum/chatType/chatMsg.ts";
import {SendChat} from "../page/typeEnum/chatType/SendChat.ts";
import ACTION from "../page/typeEnum/chatType/SednActionEnum.ts";
import socket from "./websocket.ts";

export class MessageUtils{

    //设置当前聊天的用户
    public static setCurrent(currentUserId:string,currentOtherUserId:string){
            let msg : chatMsg= {
                sendUserId: currentUserId,
                acceptUserId: currentOtherUserId,
                msg: '',
                signFlag : 0,
            }
            let sendChat : SendChat = {
                action: ACTION.SET_CURRENT_CHAT,
                chatMsg: msg,
                extand: currentUserId + ":" + currentOtherUserId,
            }
            socket.send(sendChat)
    }

    //第一次连接获取唯独消息
    public static initConnectAndGetUnRead = (currentUserId) => {
        let sendMsg = {
            sendUserId: currentUserId,
            msg: '',
            signFlag : 0,
        }
        let sendChat = {
            action: ACTION.INIT,
            chatMsg: sendMsg,
        }
        socket.send(sendChat)
    }


}