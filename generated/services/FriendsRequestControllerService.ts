/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_List_FriendsRequest_ } from '../models/BaseResponse_List_FriendsRequest_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FriendsRequestControllerService {

    /**
     * requestFriends
     * @param acceptUserId acceptUserId
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static requestFriendsUsingGet(
acceptUserId?: string,
): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/request/Friends',
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
     * agreeFriend
     * @param requestId requestId
     * @param sendUserId sendUserId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static agreeFriendUsingPost(
requestId?: string,
sendUserId?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/request/agree/Friends',
            query: {
                'requestId': requestId,
                'sendUserId': sendUserId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getMyRequest
     * @returns BaseResponse_List_FriendsRequest_ OK
     * @throws ApiError
     */
    public static getMyRequestUsingGet(): CancelablePromise<BaseResponse_List_FriendsRequest_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/request/get/request',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * rejectFriend
     * @param acceptUserId acceptUserId
     * @param requestId requestId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static rejectFriendUsingPost(
acceptUserId?: string,
requestId?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/request/reject/Friends',
            query: {
                'acceptUserId': acceptUserId,
                'requestId': requestId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * setReadMessage
     * @returns BaseResponse_int_ OK
     * @throws ApiError
     */
    public static setReadMessageUsingGet(): CancelablePromise<BaseResponse_int_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/request/setReadMessage',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
