/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_UserVo_ } from '../models/BaseResponse_List_UserVo_';
import type { BaseResponse_object_ } from '../models/BaseResponse_object_';
import type { BaseResponse_Page_UserVo_ } from '../models/BaseResponse_Page_UserVo_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { BaseResponse_Users_ } from '../models/BaseResponse_Users_';
import type { BaseResponse_UserVo_ } from '../models/BaseResponse_UserVo_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { QCCode } from '../models/QCCode';
import type { UserAddRequest } from '../models/UserAddRequest';
import type { UserLoginRequest } from '../models/UserLoginRequest';
import type { UserRegisterRequest } from '../models/UserRegisterRequest';
import type { UserUpdateRequest } from '../models/UserUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserControllerService {

    /**
     * addUser
     * @param userAddRequest userAddRequest
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUserUsingPost(
userAddRequest: UserAddRequest,
): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/add',
            body: userAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteUser
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteUserUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getUserById
     * @param id id
     * @returns BaseResponse_UserVo_ OK
     * @throws ApiError
     */
    public static getUserByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_UserVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/get',
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
     * getLoginUser
     * @returns BaseResponse_UserVo_ OK
     * @throws ApiError
     */
    public static getLoginUserUsingGet(): CancelablePromise<BaseResponse_UserVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/get/login',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listUser
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
     * @returns BaseResponse_List_UserVo_ OK
     * @throws ApiError
     */
    public static listUserUsingGet(
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
): CancelablePromise<BaseResponse_List_UserVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/list',
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
     * listUserByPage
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
     * @returns BaseResponse_Page_UserVo_ OK
     * @throws ApiError
     */
    public static listUserByPageUsingGet(
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
): CancelablePromise<BaseResponse_Page_UserVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/list/page',
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
     * userLogin
     * @param userLoginRequest userLoginRequest
     * @returns BaseResponse_Users_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userLoginUsingPost(
userLoginRequest: UserLoginRequest,
): CancelablePromise<BaseResponse_Users_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            body: userLoginRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * userLogout
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userLogoutUsingPost(): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/logout',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * userRegister
     * @param userRegisterRequest userRegisterRequest
     * @returns BaseResponse_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userRegisterUsingPost(
userRegisterRequest: UserRegisterRequest,
): CancelablePromise<BaseResponse_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/register',
            body: userRegisterRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateUser
     * @param userUpdateRequest userUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserUsingPost(
userUpdateRequest: UserUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/update',
            body: userUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * comparePicCode
     * @param codeTypeEnum codeTypeEnum
     * @param qcCode qcCode
     * @returns BaseResponse_object_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static comparePicCodeUsingPost(
codeTypeEnum: 'forgetPwdCode' | 'loginCode' | 'registerCode',
qcCode: QCCode,
): CancelablePromise<BaseResponse_object_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{codeTypeEnum}/comparePicCode',
            path: {
                'codeTypeEnum': codeTypeEnum,
            },
            body: qcCode,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getVerifyCode
     * @param codeTypeEnum codeTypeEnum
     * @returns any OK
     * @throws ApiError
     */
    public static getVerifyCodeUsingGet(
codeTypeEnum: 'forgetPwdCode' | 'loginCode' | 'registerCode',
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{codeTypeEnum}/getVerifyCode',
            path: {
                'codeTypeEnum': codeTypeEnum,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
