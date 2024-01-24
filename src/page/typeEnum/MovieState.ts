/**
 * 0 未上架
 * 1 正片
 */

const getMovieState = (state:number) => {
    switch (state){
        case 0: return "未上架"
        case 1: return "正片"
        case 2: return "vip影视"
        case 3: return "付费影视"
    }
}

export default getMovieState;