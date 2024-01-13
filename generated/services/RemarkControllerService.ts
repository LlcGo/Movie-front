/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_List_Remark_ } from '../models/BaseResponse_List_Remark_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_RemarkVo_ } from '../models/BaseResponse_Page_RemarkVo_';
import type { BaseResponse_Remark_ } from '../models/BaseResponse_Remark_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { RemarkAddRequest } from '../models/RemarkAddRequest';
import type { RemarkDeleteRequest } from '../models/RemarkDeleteRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RemarkControllerService {

    /**
     * addRemark
     * @param remarkAddRequest remarkAddRequest
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addRemarkUsingPost(
remarkAddRequest: RemarkAddRequest,
): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/remark/add',
            body: remarkAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteRemark
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteRemarkUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/remark/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getRemarkById
     * @param id id
     * @returns BaseResponse_Remark_ OK
     * @throws ApiError
     */
    public static getRemarkByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_Remark_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/remark/get',
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
     * listRemark
     * @param current 
     * @param movieId 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @returns BaseResponse_List_Remark_ OK
     * @throws ApiError
     */
    public static listRemarkUsingGet(
current?: number,
movieId?: number,
pageSize?: number,
sortField?: string,
sortOrder?: string,
): CancelablePromise<BaseResponse_List_Remark_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/remark/list',
            query: {
                'current': current,
                'movieId': movieId,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listCount
     * @param current 
     * @param movieId 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @returns BaseResponse_long_ OK
     * @throws ApiError
     */
    public static listCountUsingGet(
movieId?: number,
current?: number,
pageSize?: number,
sortField?: string,
sortOrder?: string,
): CancelablePromise<BaseResponse_long_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/remark/list/count',
            query: {
                'movieId': movieId,
                'current': current,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listRemarkByPage
     * @param current 
     * @param movieId 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @returns BaseResponse_Page_RemarkVo_ OK
     * @throws ApiError
     */
    public static listRemarkByPageUsingGet(

movieId?: number,
current?: number,
pageSize?: number,
sortField?: string,
sortOrder?: string,
): CancelablePromise<BaseResponse_Page_RemarkVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/remark/list/page',
            query: {
                'movieId': movieId,
                'current': current,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteUserRemark
     * @param remarkDeleteRequest remarkDeleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteUserRemarkUsingPost(
remarkDeleteRequest: RemarkDeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/remark/user/delete',
            body: remarkDeleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
