/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_MovieType_ } from '../models/BaseResponse_List_MovieType_';
import type { BaseResponse_MovieType_ } from '../models/BaseResponse_MovieType_';
import type { BaseResponse_Page_MovieType_ } from '../models/BaseResponse_Page_MovieType_';
import type { MovieQueryRequest } from '../models/MovieQueryRequest';
import type { MovieType } from '../models/MovieType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MovieTyepControllerService {

    /**
     * getMovieNation
     * @returns BaseResponse_List_MovieType_ OK
     * @throws ApiError
     */
    public static getMovieNationUsingGet(): CancelablePromise<BaseResponse_List_MovieType_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/type/getMovieType',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * addMovieType
     * @param typeName typeName
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addMovieTypeUsingPost(
typeName?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/type/type/add',
            query: {
                'typeName': typeName,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateMovieType
     * @param id id
     * @returns BaseResponse_MovieType_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateMovieTypeUsingPost(
id?: number,
): CancelablePromise<BaseResponse_MovieType_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/type/type/get',
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
     * listMovieTypeByPage
     * @param movieQueryRequest movieQueryRequest
     * @returns BaseResponse_Page_MovieType_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMovieTypeByPageUsingPost(
movieQueryRequest: MovieQueryRequest,
): CancelablePromise<BaseResponse_Page_MovieType_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/type/type/list/page',
            body: movieQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteMovieType
     * @param movieType movieType
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteMovieTypeUsingPost(
movieType: MovieType,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/type/type/remove',
            body: movieType,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateMovieType
     * @param movieType movieType
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateMovieTypeUsingPost1(
movieType: MovieType,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/type/type/update',
            body: movieType,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
