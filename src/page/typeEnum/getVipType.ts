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
const getVipType = (type:number) => {
    switch (type){
        case 0: return '月'
        case 1: return '季度'
        case 2: return '年'
    }
};

export default getVipType;
