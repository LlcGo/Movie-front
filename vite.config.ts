import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createSvgIconsPlugin({
            // 指定要缓存的图标文件夹
            iconDirs: [path.resolve('./src/icons/svg')],
            // 执行icon name的格式
            symbolId: 'icon-[name]',
        }),
    ],
    resolve: {
        alias: {
            '@':  path.resolve('./src')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
        port: '5173',
        proxy: {
            '/api': {
                target: 'http://localhost:7529',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
            }
        }
    }
})
// module.exports = {
//   devServer: {
//     port:5173,
//     // proxy: {
//     //   '/api': {
//     //     target: 'http://localhost:7529',//代理地址，这里设置的地址会代替axios中设置的baseURL
//     //     changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
//     //     ws: true, // proxy websockets
//     //     secure: false, //忽略https安全提示
//     //     //xfwd：false, //添加x-forward标头
//     //     //pathRewrite方法重写url
//     //     pathRewrite: {
//     //       '^/api': ''//重写之后url为 http://localhost:8080/xxxx
//     //     }
//     //     //pathRewrite: {'^/api': '/api'} //重写之后url为 http://localhost:8080/api/xxxx
//     //   }
//     // }
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8084/onlineExam',//代理地址，这里设置的地址会代替axios中设置的baseURL
//         changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
//         ws: true, // proxy websockets
//         secure: false, //忽略https安全提示
//         //xfwd：false, //添加x-forward标头
//         //pathRewrite方法重写url
//         pathRewrite: {
//           '^/api': ''//重写之后url为 http://localhost:8080/xxxx
//         }
//         //pathRewrite: {'^/api': '/api'} //重写之后url为 http://localhost:8080/api/xxxx
//       }
//     }
//   }
// }