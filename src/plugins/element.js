import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 注册全部的svg图标
import elementIcons from '../plugins/svgicon'

export default app => {
  app
      .use(ElementPlus)
      .use(elementIcons) //全局注册element svg图标
}
