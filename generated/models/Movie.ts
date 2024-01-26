/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MovieNation } from './MovieNation';
import type { MovieType } from './MovieType';
import type { MovieYear } from './MovieYear';

export type Movie = {
    actorsName?: string;
    buy?: boolean;
    creatTime?: string;
    directorName?: string;
    hot?: number;
    id?: number;
    img?: string;
    isDelete?: number;
    movieName?: string;
    movieNation?: MovieNation;
    movieProfile?: string;
    movieType?: MovieType;
    movieYear?: MovieYear;
    nation?: number;
    price?: number;
    score?: number;
    state?: number;
    type?: number;
    updateTime?: string;
    userId?: string;
    videoId?: number;
    year?: number;
};
