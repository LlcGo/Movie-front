/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_List_MovieYear_ } from '../models/BaseResponse_List_MovieYear_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MovieYearControllerService {

    /**
     * getMovieType
     * @returns BaseResponse_List_MovieYear_ OK
     * @throws ApiError
     */
    public static getMovieTypeUsingGet1(): CancelablePromise<BaseResponse_List_MovieYear_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/getMovieYear',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
