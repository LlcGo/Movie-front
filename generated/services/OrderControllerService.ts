/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_List_Order_ } from '../models/BaseResponse_List_Order_';
import type { BaseResponse_Order_ } from '../models/BaseResponse_Order_';
import type { BaseResponse_Page_Order_ } from '../models/BaseResponse_Page_Order_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { OrderAddRequest } from '../models/OrderAddRequest';
import type { OrderByRequest } from '../models/OrderByRequest';
import type { OrderUpdateRequest } from '../models/OrderUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrderControllerService {

    /**
     * addOrder
     * @param orderAddRequest orderAddRequest
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addOrderUsingPost(
orderAddRequest: OrderAddRequest,
): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/add',
            body: orderAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * OrderBuy
     * @param orderByRequest orderByRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static orderBuyUsingPost(
orderByRequest: OrderByRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/buy',
            body: orderByRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteOrder
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteOrderUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getOrderById
     * @param id id
     * @returns BaseResponse_Order_ OK
     * @throws ApiError
     */
    public static getOrderByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_Order_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/get',
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
     * getOrderByUserId
     * @returns BaseResponse_List_Order_ OK
     * @throws ApiError
     */
    public static getOrderByUserIdUsingGet(): CancelablePromise<BaseResponse_List_Order_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/get/myOrder',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getDDLTime
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getDdlTimeUsingPost(): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/getDDLTime',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listOrder
     * @param createTime 
     * @param current 
     * @param gender 
     * @param id 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @param updateTime 
     * @param userAccount 
     * @param userAvatar 
     * @param userName 
     * @param userRole 
     * @returns BaseResponse_List_Order_ OK
     * @throws ApiError
     */
    public static listOrderUsingGet(
createTime?: string,
current?: number,
gender?: number,
id?: number,
pageSize?: number,
sortField?: string,
sortOrder?: string,
updateTime?: string,
userAccount?: string,
userAvatar?: string,
userName?: string,
userRole?: string,
): CancelablePromise<BaseResponse_List_Order_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/list',
            query: {
                'createTime': createTime,
                'current': current,
                'gender': gender,
                'id': id,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'updateTime': updateTime,
                'userAccount': userAccount,
                'userAvatar': userAvatar,
                'userName': userName,
                'userRole': userRole,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listOrderByPage
     * @param createTime 
     * @param current 
     * @param gender 
     * @param id 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @param updateTime 
     * @param userAccount 
     * @param userAvatar 
     * @param userName 
     * @param userRole 
     * @returns BaseResponse_Page_Order_ OK
     * @throws ApiError
     */
    public static listOrderByPageUsingGet(
createTime?: string,
current?: number,
gender?: number,
id?: number,
pageSize?: number,
sortField?: string,
sortOrder?: string,
updateTime?: string,
userAccount?: string,
userAvatar?: string,
userName?: string,
userRole?: string,
): CancelablePromise<BaseResponse_Page_Order_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/list/page',
            query: {
                'createTime': createTime,
                'current': current,
                'gender': gender,
                'id': id,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'updateTime': updateTime,
                'userAccount': userAccount,
                'userAvatar': userAvatar,
                'userName': userName,
                'userRole': userRole,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * toBuy
     * @param orderByRequest orderByRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static toBuyUsingPost(
orderByRequest: OrderByRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/tobuy',
            body: orderByRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateOrder
     * @param orderUpdateRequest orderUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateOrderUsingPost(
orderUpdateRequest: OrderUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/update',
            body: orderUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
