const getMoveType = (type:number) => {
        switch (type){
            case 0:
                return "战争片"
            case 1:
                return "奇幻片"
            case 2:
                return "科幻片"
            case 3:
                return "剧情片"
            case 4:
                return "恐怖片"
            case 5:
                return "爱情片"
            case 6:
                return "动作片"
            case 7:
                return "喜剧片"
            case 8:
                return "动画片"
            case 9:
                return "悬疑片"
            case 10:
                return "纪录片"
        }
}

export default getMoveType;
/**
 * 0 战争片
 1 奇幻片
 2 科幻片
 3 剧情片
 4 恐怖片
 5 爱情片
 6 动作片
 7 喜剧片
 8 动画片
 9 悬疑片
 10 纪录片
 */