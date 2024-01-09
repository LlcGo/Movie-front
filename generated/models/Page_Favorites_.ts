/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Favorites } from './Favorites';
import type { OrderItem } from './OrderItem';

export type Page_Favorites_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<Favorites>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
