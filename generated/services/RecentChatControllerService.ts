/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_RecentChat_ } from '../models/BaseResponse_List_RecentChat_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RecentChatControllerService {

    /**
     * addRecentChat
     * @param acceptUserId acceptUserId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addRecentChatUsingPost(
acceptUserId?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/recentChat/add',
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
     * deleteRecentChat
     * @param acceptUserId acceptUserId
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static deleteRecentChatUsingGet(
acceptUserId?: string,
): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/recentChat/delete',
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
     * getRecentChat
     * @returns BaseResponse_List_RecentChat_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getRecentChatUsingPost(): CancelablePromise<BaseResponse_List_RecentChat_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/recentChat/get',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
