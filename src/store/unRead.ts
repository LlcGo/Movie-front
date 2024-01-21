// @ts-check
import { defineStore, acceptHMRUpdate } from 'pinia'
import {BaseResponse_User_, UserControllerService, UserLoginRequest, UserVo} from "../../generated";



export const unReadStore = defineStore('unRead',{

    state: () => ({
        unReadSize : 0
    }),

    actions: {
        addSize(size:number){
            this.unReadSize = this.unReadSize+ size;
        },
        redSize(size:number){
            this.unReadSize = this.unReadSize - size;
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(unReadStore, import.meta.hot))
}
