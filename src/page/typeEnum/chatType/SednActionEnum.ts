//action 1 第一次连接 或者重连 并且获取未读消息
//action 2 聊天信息
// 3 使用redis 来设置当前关系,如果是相互聊天直接存入数据库已读，如果不是那就发送存为离线消息
// 4 心跳
// 5 添加好友
const ACTION = {
    'INIT' : 1,
    'CHAT' : 2,
    'SET_CURRENT_CHAT' : 3,
    'XT' : 4,
    'ADD_FRIEND' : 5
}

export default ACTION;