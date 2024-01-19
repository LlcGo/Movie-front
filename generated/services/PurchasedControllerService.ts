/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_List_PurchasedVO_ } from '../models/BaseResponse_List_PurchasedVO_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PurchasedControllerService {

    /**
     * getMyPurchased
     * @returns BaseResponse_List_PurchasedVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getMyPurchasedUsingPost(): CancelablePromise<BaseResponse_List_PurchasedVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/purchased/get',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}