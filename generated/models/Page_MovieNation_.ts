/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MovieNation } from './MovieNation';
import type { OrderItem } from './OrderItem';

export type Page_MovieNation_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<MovieNation>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
