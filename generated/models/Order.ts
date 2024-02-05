/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Movie } from './Movie';
import type { Users } from './Users';

export type Order = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    movie?: Movie;
    movieId?: number;
    orderState?: number;
    state?: number;
    total?: number;
    updateTime?: string;
    user?: Users;
    userId?: string;
    vipType?: number;
};
