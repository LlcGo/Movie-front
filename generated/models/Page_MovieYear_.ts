/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MovieYear } from './MovieYear';
import type { OrderItem } from './OrderItem';

export type Page_MovieYear_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<MovieYear>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
