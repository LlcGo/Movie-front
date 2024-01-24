/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_List_MovieType_ } from '../models/BaseResponse_List_MovieType_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MovieTyepControllerService {

    /**
     * getMovieType
     * @returns BaseResponse_List_MovieType_ OK
     * @throws ApiError
     */
    public static getMovieTypeUsingGet(): CancelablePromise<BaseResponse_List_MovieType_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/getMovieType',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
