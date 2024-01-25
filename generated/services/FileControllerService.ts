/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse } from '../models/BaseResponse';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FileControllerService {

    /**
     * getVideoSizeById
     * @param videoId videoId
     * @returns number OK
     * @throws ApiError
     */
    public static getVideoSizeByIdUsingGet(
videoId: number,
): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/getVideoSizeById/{videoId}',
            path: {
                'videoId': videoId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * upload
     * @param chunkNumber chunkNumber
     * @param chunkSize chunkSize
     * @param file file
     * @param fileName fileName
     * @returns BaseResponse OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadUsingPost(
chunkNumber: number,
chunkSize: number,
file: Blob,
fileName: string,
): CancelablePromise<BaseResponse | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/upload',
            query: {
                'chunkNumber': chunkNumber,
                'chunkSize': chunkSize,
                'fileName': fileName,
            },
            body: file,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * uploadUserImg
     * @param file file
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadUserImgUsingPost(
file: Blob,
): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/uploadUserImg',
            body: file,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * videoPreview
     * @param videoId videoId
     * @returns any OK
     * @throws ApiError
     */
    public static videoPreviewUsingGet(
videoId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/watchVedio',
            query: {
                'videoId': videoId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
