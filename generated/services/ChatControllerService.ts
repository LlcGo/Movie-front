/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_List_ChatMsg_ } from '../models/BaseResponse_List_ChatMsg_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ChatControllerService {

    /**
     * getChat
     * @param otherUserId otherUserId
     * @param userId userId
     * @returns BaseResponse_List_ChatMsg_ OK
     * @throws ApiError
     */
    public static getChatUsingGet(
otherUserId: string,
userId: string,
): CancelablePromise<BaseResponse_List_ChatMsg_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/getChat',
            query: {
                'otherUserId': otherUserId,
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
