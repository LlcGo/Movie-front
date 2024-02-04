/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_ConcurrentHashMap_int_List_Movie_ } from '../models/BaseResponse_ConcurrentHashMap_int_List_Movie_';
import type { BaseResponse_int_ } from '../models/BaseResponse_int_';
import type { BaseResponse_List_Movie_ } from '../models/BaseResponse_List_Movie_';
import type { BaseResponse_Map_object_object_ } from '../models/BaseResponse_Map_object_object_';
import type { BaseResponse_MovieVo_ } from '../models/BaseResponse_MovieVo_';
import type { BaseResponse_Page_Movie_ } from '../models/BaseResponse_Page_Movie_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { MovieAddRe } from '../models/MovieAddRe';
import type { MovieAddRequest } from '../models/MovieAddRequest';
import type { MovieQueryRequest } from '../models/MovieQueryRequest';
import type { MovieUpdateRequest } from '../models/MovieUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MovieControllerService {

    /**
     * addMovie
     * @param movieAddRequest movieAddRequest
     * @returns BaseResponse_int_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addMovieUsingPost(
movieAddRequest: MovieAddRequest,
): CancelablePromise<BaseResponse_int_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/add',
            body: movieAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteMovie
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteMovieUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getMovieById
     * @param id id
     * @returns BaseResponse_MovieVo_ OK
     * @throws ApiError
     */
    public static getMovieByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_MovieVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/movie/get',
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
     * getSearchRe
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getSearchReUsingPost(): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/get/SearchRe',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getSyRe
     * @returns BaseResponse_Map_object_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getSyReUsingPost(): CancelablePromise<BaseResponse_Map_object_object_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/get/SyRe',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getTypeRe
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getTypeReUsingPost(): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/get/TypeRe',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getHotMovie
     * @returns BaseResponse_List_Movie_ OK
     * @throws ApiError
     */
    public static getHotMovieUsingGet(): CancelablePromise<BaseResponse_List_Movie_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/movie/get/hotMovie',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getSyReMovieById
     * @param id id
     * @param id2 id2
     * @param id3 id3
     * @returns BaseResponse_List_Movie_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getSyReMovieByIdUsingPost(
id?: number,
id2?: number,
id3?: number,
): CancelablePromise<BaseResponse_List_Movie_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/get/ids',
            query: {
                'id': id,
                'id2': id2,
                'id3': id3,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getHotByType
     * @param type type
     * @returns BaseResponse_List_Movie_ OK
     * @throws ApiError
     */
    public static getHotByTypeUsingGet(
type?: number,
): CancelablePromise<BaseResponse_List_Movie_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/movie/getHot',
            query: {
                'type': type,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * addHot
     * @param movieId movieId
     * @returns any OK
     * @throws ApiError
     */
    public static addHotUsingPost(
movieId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/hot',
            query: {
                'movieId': movieId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMovie
     * @param actorId 
     * @param creatTime 
     * @param current 
     * @param directorId 
     * @param hot 
     * @param id 
     * @param isDelete 
     * @param movieName 
     * @param nation 
     * @param pageSize 
     * @param score 
     * @param sortField 
     * @param sortOrder 
     * @param state 
     * @param type 
     * @param updateTime 
     * @param userId 
     * @param videoId 
     * @param year 
     * @returns BaseResponse_List_Movie_ OK
     * @throws ApiError
     */
    public static listMovieUsingGet(
actorId?: number,
creatTime?: string,
current?: number,
directorId?: number,
hot?: boolean,
id?: number,
isDelete?: number,
movieName?: string,
nation?: number,
pageSize?: number,
score?: boolean,
sortField?: string,
sortOrder?: string,
state?: number,
type?: number,
updateTime?: string,
userId?: string,
videoId?: number,
year?: number,
): CancelablePromise<BaseResponse_List_Movie_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/movie/list',
            query: {
                'actorId': actorId,
                'creatTime': creatTime,
                'current': current,
                'directorId': directorId,
                'hot': hot,
                'id': id,
                'isDelete': isDelete,
                'movieName': movieName,
                'nation': nation,
                'pageSize': pageSize,
                'score': score,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'state': state,
                'type': type,
                'updateTime': updateTime,
                'userId': userId,
                'videoId': videoId,
                'year': year,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listIndexMovieByPage
     * @returns BaseResponse_ConcurrentHashMap_int_List_Movie_ OK
     * @throws ApiError
     */
    public static listIndexMovieByPageUsingGet(): CancelablePromise<BaseResponse_ConcurrentHashMap_int_List_Movie_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/movie/list/index/page',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMovieByPage
     * @param movieQueryRequest movieQueryRequest
     * @returns BaseResponse_Page_Movie_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMovieByPageUsingPost(
movieQueryRequest: MovieQueryRequest,
): CancelablePromise<BaseResponse_Page_Movie_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/list/page',
            body: movieQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * setSearchRe
     * @param state state
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setSearchReUsingPost(
state?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/set/SearchRe',
            query: {
                'state': state,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * setSyRe
     * @param movie movie
     * @param state state
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setSyReUsingPost(
movie: MovieAddRe,
state?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/set/SyRe',
            query: {
                'state': state,
            },
            body: movie,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * setTypeRe
     * @param state state
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setTypeReUsingPost(
state?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/set/TypeRe',
            query: {
                'state': state,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * setMf
     * @param movieId movieId
     * @param state state
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setMfUsingPost(
movieId?: number,
state?: number,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/set/mf',
            query: {
                'movieId': movieId,
                'state': state,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * setPrice
     * @param movieId movieId
     * @param price price
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setPriceUsingPost(
movieId?: number,
price?: number,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/set/price',
            query: {
                'movieId': movieId,
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
     * setState
     * @param flag flag
     * @param movieId movieId
     * @param state state
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static setStateUsingPost(
flag?: boolean,
movieId?: number,
state?: number,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/set/state',
            query: {
                'flag': flag,
                'movieId': movieId,
                'state': state,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateMovie
     * @param movieUpdateRequest movieUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateMovieUsingPost(
movieUpdateRequest: MovieUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/movie/update',
            body: movieUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
