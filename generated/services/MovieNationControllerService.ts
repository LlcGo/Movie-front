/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_MovieNation_ } from '../models/BaseResponse_List_MovieNation_';
import type { BaseResponse_MovieNation_ } from '../models/BaseResponse_MovieNation_';
import type { BaseResponse_Page_MovieNation_ } from '../models/BaseResponse_Page_MovieNation_';
import type { MovieNation } from '../models/MovieNation';
import type { MovieQueryRequest } from '../models/MovieQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MovieNationControllerService {

    /**
     * getMoveNation
     * @returns BaseResponse_List_MovieNation_ OK
     * @throws ApiError
     */
    public static getMoveNationUsingGet(): CancelablePromise<BaseResponse_List_MovieNation_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/nation/getMovieNation',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * addMoveNation
     * @param typeName typeName
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addMoveNationUsingPost(
typeName?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/nation/nation/add',
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
     * updateMoveNation
     * @param id id
     * @returns BaseResponse_MovieNation_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateMoveNationUsingPost(
id?: number,
): CancelablePromise<BaseResponse_MovieNation_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/nation/nation/get',
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
     * listMoveNationByPage
     * @param movieQueryRequest movieQueryRequest
     * @returns BaseResponse_Page_MovieNation_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMoveNationByPageUsingPost(
movieQueryRequest: MovieQueryRequest,
): CancelablePromise<BaseResponse_Page_MovieNation_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/nation/nation/list/page',
            body: movieQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteMoveNation
     * @param moveNation moveNation
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteMoveNationUsingPost(
moveNation: MovieNation,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/nation/nation/remove',
            body: moveNation,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateMoveNation
     * @param moveNation moveNation
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateMoveNationUsingPost1(
moveNation: MovieNation,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/nation/nation/update',
            body: moveNation,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
