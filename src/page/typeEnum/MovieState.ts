/**
 * 0 未上架
 * 1 正片
 */

const getMovieState = (state:number) => {
    switch (state){
        case 0: return "未上架"
        case 1: return "正片"
    }
}

export default getMovieState;