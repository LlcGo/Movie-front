/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_List_VideoUpload_ } from '../models/BaseResponse_List_VideoUpload_';
import type { BaseResponse_Page_VideoUpload_ } from '../models/BaseResponse_Page_VideoUpload_';
import type { VideQueryRequest } from '../models/VideQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ParsingControllerService {

    /**
     * getListVideo
     * @param videQueryRequest videQueryRequest
     * @returns BaseResponse_Page_VideoUpload_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getListVideoUsingPost(
videQueryRequest: VideQueryRequest,
): CancelablePromise<BaseResponse_Page_VideoUpload_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/parsing/getList',
            body: videQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getVideoList
     * @returns BaseResponse_List_VideoUpload_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getVideoListUsingPost(): CancelablePromise<BaseResponse_List_VideoUpload_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/parsing/getVideoList',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
