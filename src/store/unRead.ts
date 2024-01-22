// @ts-check
import { defineStore, acceptHMRUpdate } from 'pinia'
import {BaseResponse_User_, UserControllerService, UserLoginRequest, UserVo} from "../../generated";



export const unReadStore = defineStore('unRead',{

    state: () => ({
        unReadSize : 0,
        unRequest : 0,
        unReadTotal : 0,
    }),

    actions: {
        addSize(size:number){
            this.unReadSize = this.unReadSize + size;
        },
        redSize(size:number){
            this.unReadSize = this.unReadSize - size;
        },
        addRequestSize(size:number){
            this.unRequest = this.unRequest+ size;
        },
        redRequestSize(size:number){
            this.unRequest = this.unRequest - size;
        },
        setTotal(){
            this.unReadTotal = this.unReadSize + this.unRequest
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(unReadStore, import.meta.hot))
}
