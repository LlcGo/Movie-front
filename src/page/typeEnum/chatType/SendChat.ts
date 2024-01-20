import {chatMsg} from "./chatMsg";
//  CONNECT(1, "第一次(或重连)初始化连接"),
// 	CHAT(2, "聊天消息"), SIGNED(3, "设置当前关系"),
// 	KEEPALIVE(4, "客户端保持心跳"),
// 	PULL_FRIEND(5, "拉取好友");
//action 1 第一次连接 或者重连 并且获取未读消息
//action 2 聊天信息
// 3 使用redis 来设置当前关系,如果是相互聊天直接存入数据库已读，如果不是那就发送存为离线消息
// 4 心跳
// 5 添加好友
export type SendChat = {
    action?: number,
    chatMsg?: chatMsg,
    extand?: string,
};