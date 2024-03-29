/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_MyFriends_ } from '../models/BaseResponse_List_MyFriends_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FriendsControllerService {

    /**
     * deleteMyFriend
     * @param acceptUserId acceptUserId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteMyFriendUsingPost(
acceptUserId?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/delete/myFriends',
            query: {
                'acceptUserId': acceptUserId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getMyFriends
     * @param userId userId
     * @returns BaseResponse_List_MyFriends_ OK
     * @throws ApiError
     */
    public static getMyFriendsUsingGet(
userId: string,
): CancelablePromise<BaseResponse_List_MyFriends_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get/myFriends',
            query: {
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * removeCurrent
     * @returns any OK
     * @throws ApiError
     */
    public static removeCurrentUsingPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/removeCurrent',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
