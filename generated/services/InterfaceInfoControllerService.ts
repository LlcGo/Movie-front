/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_InterfaceInfo_ } from '../models/BaseResponse_InterfaceInfo_';
import type { BaseResponse_List_InterfaceInfo_ } from '../models/BaseResponse_List_InterfaceInfo_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_InterfaceInfo_ } from '../models/BaseResponse_Page_InterfaceInfo_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { IdRequest } from '../models/IdRequest';
import type { InterfaceInfoAddRequest } from '../models/InterfaceInfoAddRequest';
import type { InterfaceInfoUpdateRequest } from '../models/InterfaceInfoUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InterfaceInfoControllerService {

    /**
     * addInterfaceInfo
     * @param interfaceInfoAddRequest interfaceInfoAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addInterfaceInfoUsingPost(
interfaceInfoAddRequest: InterfaceInfoAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interfaceInfo/add',
            body: interfaceInfoAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteInterfaceInfo
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteInterfaceInfoUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interfaceInfo/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getInterfaceInfoById
     * @param id id
     * @returns BaseResponse_InterfaceInfo_ OK
     * @throws ApiError
     */
    public static getInterfaceInfoByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_InterfaceInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/interfaceInfo/get',
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
     * listInterfaceInfo
     * @param current 
     * @param description 
     * @param method 
     * @param name 
     * @param pageSize 
     * @param requestHeader 
     * @param requestParams 
     * @param responseHeader 
     * @param sortField 
     * @param sortOrder 
     * @param status 
     * @param url 
     * @param userId 
     * @returns BaseResponse_List_InterfaceInfo_ OK
     * @throws ApiError
     */
    public static listInterfaceInfoUsingGet(
current?: number,
description?: string,
method?: string,
name?: string,
pageSize?: number,
requestHeader?: string,
requestParams?: string,
responseHeader?: string,
sortField?: string,
sortOrder?: string,
status?: number,
url?: string,
userId?: number,
): CancelablePromise<BaseResponse_List_InterfaceInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/interfaceInfo/list',
            query: {
                'current': current,
                'description': description,
                'method': method,
                'name': name,
                'pageSize': pageSize,
                'requestHeader': requestHeader,
                'requestParams': requestParams,
                'responseHeader': responseHeader,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'status': status,
                'url': url,
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listInterfaceInfoByPage
     * @param current 
     * @param description 
     * @param method 
     * @param name 
     * @param pageSize 
     * @param requestHeader 
     * @param requestParams 
     * @param responseHeader 
     * @param sortField 
     * @param sortOrder 
     * @param status 
     * @param url 
     * @param userId 
     * @returns BaseResponse_Page_InterfaceInfo_ OK
     * @throws ApiError
     */
    public static listInterfaceInfoByPageUsingGet(
current?: number,
description?: string,
method?: string,
name?: string,
pageSize?: number,
requestHeader?: string,
requestParams?: string,
responseHeader?: string,
sortField?: string,
sortOrder?: string,
status?: number,
url?: string,
userId?: number,
): CancelablePromise<BaseResponse_Page_InterfaceInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/interfaceInfo/list/page',
            query: {
                'current': current,
                'description': description,
                'method': method,
                'name': name,
                'pageSize': pageSize,
                'requestHeader': requestHeader,
                'requestParams': requestParams,
                'responseHeader': responseHeader,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'status': status,
                'url': url,
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * offlineInterfaceInfo
     * @param idRequest idRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static offlineInterfaceInfoUsingPost(
idRequest: IdRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interfaceInfo/offline',
            body: idRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateInterfaceInfo
     * @param interfaceInfoUpdateRequest interfaceInfoUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateInterfaceInfoUsingPost(
interfaceInfoUpdateRequest: InterfaceInfoUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interfaceInfo/update',
            body: interfaceInfoUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
