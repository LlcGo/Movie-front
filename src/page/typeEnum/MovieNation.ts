/**
 * 0 中国
 1 美国
 2 中国香港
 3 韩国
 4 日本
 5 法国
 6 英国
 7 德国
 8 泰国
 9 印度
 */
const getMovieNation = (nation:string) => {
    switch (nation){
        case '0': return '中国'
        case '1': return '美国'
        case '2': return '中国香港'
        case '3': return '韩国'
        case '4': return '日本'
        case '5': return '法国'
        case '6': return '英国'
        case '7': return '德国'
        case '8': return '泰国'
        case '9': return '印度'
    }
}

export default getMovieNation;