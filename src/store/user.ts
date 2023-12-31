// @ts-check
import { defineStore, acceptHMRUpdate } from 'pinia'
import {BaseResponse_User_, UserControllerService, UserLoginRequest, UserVo} from "../../generated";

/**
 * Simulate a login
 */
const apiLogin =   async(user: UserLoginRequest ):Promise<BaseResponse_User_> => {
    const res = await UserControllerService.userLoginUsingPost(user)
    if (res) return Promise.resolve(res)
    if (!res) return Promise.resolve(undefined)
    return Promise.reject(new Error('invalid credentials'))
}

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        currentUser :undefined as UserVo
    }),

    actions: {
        async logout() {
           await UserControllerService.userLogoutUsingPost()
            this.$patch({
                currentUser: undefined,
            })
            // we could do other stuff like redirecting the user
        },

        setUser(user:UserVo) {
           // const res =  await UserControllerService.getLoginUserUsingGet()
            this.$patch({
                currentUser: user,
            })
            // we could do other stuff like redirecting the user
        },

        /**
         * Attempt to login a user
         */
        async login(user: UserLoginRequest ):Promise<BaseResponse_User_> {
            const userData:BaseResponse_User_ = await apiLogin(user)
            this.$patch({
                currentUser:userData.data as UserVo,
            })
            return userData.data;
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
