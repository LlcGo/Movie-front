/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_List_Users_ } from '../models/BaseResponse_List_Users_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FriendsControllerService {

    /**
     * getMyFriends
     * @param userId userId
     * @returns BaseResponse_List_Users_ OK
     * @throws ApiError
     */
    public static getMyFriendsUsingGet(
userId: string,
): CancelablePromise<BaseResponse_List_Users_> {
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

}
