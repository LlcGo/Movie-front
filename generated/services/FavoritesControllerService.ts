/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_Favorites_ } from '../models/BaseResponse_Favorites_';
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_List_Favorites_ } from '../models/BaseResponse_List_Favorites_';
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
     * @param current 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @param userId 
     * @returns BaseResponse_List_Favorites_ OK
     * @throws ApiError
     */
    public static listFavoritesUsingGet(
current?: number,
pageSize?: number,
sortField?: string,
sortOrder?: string,
userId?: string,
): CancelablePromise<BaseResponse_List_Favorites_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/favorites/list',
            query: {
                'current': current,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
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
     * listFavoritesByPage
     * @param current 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @param userId 
     * @returns BaseResponse_List_Favorites_ OK
     * @throws ApiError
     */
    public static listFavoritesByPageUsingGet(
current?: number,
pageSize?: number,
sortField?: string,
sortOrder?: string,
userId?: string,
): CancelablePromise<BaseResponse_List_Favorites_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/favorites/list/page',
            query: {
                'current': current,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
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
