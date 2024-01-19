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
const getPrice = (type:number) => {
    switch (type){
        case 0: return 15
        case 1: return 50
        case 2: return 148
    }
};

export default getPrice;
