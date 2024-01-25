/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_List_MovieNation_ } from '../models/BaseResponse_List_MovieNation_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MovieNationControllerService {

    /**
     * getMovieType
     * @returns BaseResponse_List_MovieNation_ OK
     * @throws ApiError
     */
    public static getMovieTypeUsingGet(): CancelablePromise<BaseResponse_List_MovieNation_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/getMovieNation',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
