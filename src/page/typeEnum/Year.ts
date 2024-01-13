const getYear = (year:number) =>{
    switch (year){
        case 0: return "2023";
        case 1: return "2022";
        case 2: return "2021";
        case 3: return "2020";
        case 4: return "2019";
        case 5: return "2018";
        case 6: return "2017";
        case 7: return "2016";
        case 8: return "2015";
        case 9: return "2014";
        case 10: return "2013";
        case 11: return "2012";
        case 12: return "2011";
        case 13: return "2010";
        case 14: return "00年代（2000-2009）";
        case 15: return "90年代（1990-1999）";
        case 16: return "更早（1979之前）";
    }
}
export default getYear;

