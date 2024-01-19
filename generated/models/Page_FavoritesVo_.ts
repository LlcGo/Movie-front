/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FavoritesVo } from './FavoritesVo';
import type { OrderItem } from './OrderItem';

export type Page_FavoritesVo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<FavoritesVo>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
