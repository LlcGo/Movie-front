/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_Users_ } from '../models/BaseResponse_List_Users_';
import type { BaseResponse_List_UserVo_ } from '../models/BaseResponse_List_UserVo_';
import type { BaseResponse_object_ } from '../models/BaseResponse_object_';
import type { BaseResponse_Page_UserVo_ } from '../models/BaseResponse_Page_UserVo_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { BaseResponse_Users_ } from '../models/BaseResponse_Users_';
import type { BaseResponse_UserVo_ } from '../models/BaseResponse_UserVo_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { QCCode } from '../models/QCCode';
import type { UpdatePassWord } from '../models/UpdatePassWord';
import type { UserAddRequest } from '../models/UserAddRequest';
import type { UserLoginRequest } from '../models/UserLoginRequest';
import type { UserQueryRequest } from '../models/UserQueryRequest';
import type { UserRegisterRequest } from '../models/UserRegisterRequest';
import type { UserUpdateRequest } from '../models/UserUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserControllerService {

    /**
     * adminLogin
     * @param userLoginRequest userLoginRequest
     * @returns BaseResponse_Users_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static adminLoginUsingPost(
userLoginRequest: UserLoginRequest,
): CancelablePromise<BaseResponse_Users_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/AdminLogin',
            body: userLoginRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

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
     * adminUpdatePassword
     * @param id id
     * @param password password
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static adminUpdatePasswordUsingPost(
id?: string,
password?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/admin/updatePassword',
            query: {
                'id': id,
                'password': password,
            },
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
     * @param faceImage 
     * @param id 
     * @param isDelete 
     * @param likeType 
     * @param nickname 
     * @param pageSize 
     * @param password 
     * @param sex 
     * @param signature 
     * @param sortField 
     * @param sortOrder 
     * @param updateTime 
     * @param username 
     * @param userRole 
     * @returns BaseResponse_List_UserVo_ OK
     * @throws ApiError
     */
    public static listUserUsingGet(
createTime?: string,
current?: number,
faceImage?: string,
id?: string,
isDelete?: number,
likeType?: string,
nickname?: string,
pageSize?: number,
password?: string,
sex?: string,
signature?: string,
sortField?: string,
sortOrder?: string,
updateTime?: string,
username?: string,
userRole?: string,
): CancelablePromise<BaseResponse_List_UserVo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/list',
            query: {
                'createTime': createTime,
                'current': current,
                'faceImage': faceImage,
                'id': id,
                'isDelete': isDelete,
                'likeType': likeType,
                'nickname': nickname,
                'pageSize': pageSize,
                'password': password,
                'sex': sex,
                'signature': signature,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'updateTime': updateTime,
                'username': username,
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
     * @param userQueryRequest userQueryRequest
     * @returns BaseResponse_Page_UserVo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUserByPageUsingPost(
userQueryRequest: UserQueryRequest,
): CancelablePromise<BaseResponse_Page_UserVo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/list/page',
            body: userQueryRequest,
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
     * matchFriend
     * @param num num
     * @returns BaseResponse_List_Users_ OK
     * @throws ApiError
     */
    public static matchFriendUsingGet(
num?: number,
): CancelablePromise<BaseResponse_List_Users_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/matchFriend',
            query: {
                'num': num,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * reUser
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static reUserUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/re',
            body: deleteRequest,
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
     * searchFriends
     * @param userQueryRequest userQueryRequest
     * @returns BaseResponse_List_Users_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static searchFriendsUsingPost(
userQueryRequest: UserQueryRequest,
): CancelablePromise<BaseResponse_List_Users_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/search/friend',
            body: userQueryRequest,
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
    public static updateUserUsingPost1(
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
     * updateUser
     * @param updatePassWord updatePassWord
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserUsingPost(
updatePassWord: UpdatePassWord,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/updatePassWord',
            body: updatePassWord,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateUserImg
     * @param imgUrI imgUrI
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserImgUsingPost(
imgUrI?: string,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/updateUserImg',
            query: {
                'imgUrI': imgUrI,
            },
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
