/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_List_Order_ } from '../models/BaseResponse_List_Order_';
import type { BaseResponse_Map_int_List_Movie_ } from '../models/BaseResponse_Map_int_List_Movie_';
import type { BaseResponse_Order_ } from '../models/BaseResponse_Order_';
import type { BaseResponse_Page_Order_ } from '../models/BaseResponse_Page_Order_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { OrderAddRequest } from '../models/OrderAddRequest';
import type { OrderByRequest } from '../models/OrderByRequest';
import type { OrderQueryRequest } from '../models/OrderQueryRequest';
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
     * listOrder
     * @param orderQueryRequest orderQueryRequest
     * @returns BaseResponse_List_Order_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listOrderUsingPost(
orderQueryRequest: OrderQueryRequest,
): CancelablePromise<BaseResponse_List_Order_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/admin/list',
            body: orderQueryRequest,
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
     * getEChars
     * @returns BaseResponse_Map_int_List_Movie_ OK
     * @throws ApiError
     */
    public static getECharsUsingGet(): CancelablePromise<BaseResponse_Map_int_List_Movie_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/get/EChars',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getJK
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getJkUsingPost(): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/get/JK',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getNK
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getNkUsingPost(): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/get/NK',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getYK
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getYkUsingPost(): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/get/YK',
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
     * listOrderByPage
     * @param current 
     * @param date 
     * @param id 
     * @param movieName 
     * @param nickName 
     * @param orderState 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @param state 
     * @param vipType 
     * @returns BaseResponse_Page_Order_ OK
     * @throws ApiError
     */
    public static listOrderByPageUsingGet(
current?: number,
date?: Array<string>,
id?: number,
movieName?: string,
nickName?: string,
orderState?: number,
pageSize?: number,
sortField?: string,
sortOrder?: string,
state?: number,
vipType?: number,
): CancelablePromise<BaseResponse_Page_Order_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/list/page',
            query: {
                'current': current,
                'date': date,
                'id': id,
                'movieName': movieName,
                'nickName': nickName,
                'orderState': orderState,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'state': state,
                'vipType': vipType,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * setJK
     * @param price price
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setJkUsingPost(
price?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/set/JK',
            query: {
                'price': price,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * setNK
     * @param price price
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setNkUsingPost(
price?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/set/NK',
            query: {
                'price': price,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * setYK
     * @param price price
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setYkUsingPost(
price?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/set/YK',
            query: {
                'price': price,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * setDDLTime
     * @param time time
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setDdlTimeUsingPost(
time?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/setDDLTime',
            query: {
                'time': time,
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
