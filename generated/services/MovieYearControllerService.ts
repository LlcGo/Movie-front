/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_MovieYear_ } from '../models/BaseResponse_List_MovieYear_';
import type { BaseResponse_MovieYear_ } from '../models/BaseResponse_MovieYear_';
import type { BaseResponse_Page_MovieYear_ } from '../models/BaseResponse_Page_MovieYear_';
import type { MovieQueryRequest } from '../models/MovieQueryRequest';
import type { MovieYear } from '../models/MovieYear';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MovieYearControllerService {

    /**
     * getMovieYear
     * @returns BaseResponse_List_MovieYear_ OK
     * @throws ApiError
     */
    public static getMovieYearUsingGet(): CancelablePromise<BaseResponse_List_MovieYear_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/year/getMovieYear',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateMovieYear
     * @param id id
     * @returns BaseResponse_MovieYear_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateMovieYearUsingPost(
id?: number,
): CancelablePromise<BaseResponse_MovieYear_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/year/type/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * addMovieYear
     * @param yearName yearName
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addMovieYearUsingPost(
yearName?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/year/year/add',
            query: {
                'yearName': yearName,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMovieYearByPage
     * @param movieQueryRequest movieQueryRequest
     * @returns BaseResponse_Page_MovieYear_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMovieYearByPageUsingPost(
movieQueryRequest: MovieQueryRequest,
): CancelablePromise<BaseResponse_Page_MovieYear_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/year/year/list/page',
            body: movieQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteMovieYear
     * @param movieType movieType
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteMovieYearUsingPost(
movieType: MovieYear,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/year/year/remove',
            body: movieType,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateMovieYear
     * @param movieType movieType
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateMovieYearUsingPost1(
movieType: MovieYear,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/year/year/update',
            body: movieType,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
