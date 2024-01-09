/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_Favorites_ } from '../models/BaseResponse_Favorites_';
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_List_Favorites_ } from '../models/BaseResponse_List_Favorites_';
import type { BaseResponse_Page_Favorites_ } from '../models/BaseResponse_Page_Favorites_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { FavoritesAddRequest } from '../models/FavoritesAddRequest';
import type { FavoritesUpdateRequest } from '../models/FavoritesUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FavoritesControllerService {

    /**
     * addFavorites
     * @param favoritesAddRequest favoritesAddRequest
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addFavoritesUsingPost(
favoritesAddRequest: FavoritesAddRequest,
): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/favorites/add',
            body: favoritesAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteFavorites
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteFavoritesUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/favorites/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getFavoritesById
     * @param id id
     * @returns BaseResponse_Favorites_ OK
     * @throws ApiError
     */
    public static getFavoritesByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_Favorites_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/favorites/get',
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
     * listFavorites
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
     * @returns BaseResponse_List_Favorites_ OK
     * @throws ApiError
     */
    public static listFavoritesUsingGet(
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
): CancelablePromise<BaseResponse_List_Favorites_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/favorites/list',
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
     * listFavoritesByPage
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
     * @returns BaseResponse_Page_Favorites_ OK
     * @throws ApiError
     */
    public static listFavoritesByPageUsingGet(
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
): CancelablePromise<BaseResponse_Page_Favorites_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/favorites/list/page',
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
     * updateFavorites
     * @param favoritesUpdateRequest favoritesUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateFavoritesUsingPost(
favoritesUpdateRequest: FavoritesUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/favorites/update',
            body: favoritesUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
