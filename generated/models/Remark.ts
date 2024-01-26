/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RemarkUser } from './RemarkUser';
import type { Users } from './Users';

export type Remark = {
    content?: string;
    createTime?: string;
    disLiked?: number;
    hate?: boolean;
    id?: number;
    isDelete?: number;
    like?: boolean;
    liked?: number;
    movieId?: number;
    remarkUser?: RemarkUser;
    score?: number;
    total?: number;
    updateTime?: string;
    user?: Users;
    userId?: string;
};
