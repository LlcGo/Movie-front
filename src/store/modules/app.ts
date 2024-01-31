import {TAGS_VIEW} from '@/constant'
import {getItem, setItem} from '@/utils/storage'
import {defineStore} from "pinia";
export const useApp = defineStore('useApp',{
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    tagsViewList: getItem(TAGS_VIEW) || [] //tagsView
  }),
  mutations: {
  },
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },
    /**
     * 添加 tags
     */
    addTagsViewList(tag) {
      console.log('addTagsViewList',tag)
      const isFind = this.tagsViewList.find(item => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        this.tagsViewList.push(tag)
        setItem(TAGS_VIEW, this.tagsViewList)
      }
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(payload) {
      console.log('removeTagsView,',payload)
      if (payload.type === 'index') {
        this.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        this.tagsViewList.splice(
            payload.index + 1,
            this.tagsViewList.length - payload.index + 1
        )
        this.tagsViewList.splice(0, payload.index)
        if(payload.index !=0){
          //list第一位加入删除了的首页tag
          this.tagsViewList.unshift({
            fullPath:'/admin',
            meta:{title: '首页', affix: true},
            name:'管理员首页跳转',
            params:{},
            path:'/admin',
            query:{},
            title: "首页"
          })
        }
      } else if (payload.type === 'right') {
        this.tagsViewList.splice(
            payload.index + 1,
            this.tagsViewList.length - payload.index + 1
        )
      } else if (payload.type === 'all') {
        this.tagsViewList = []
      }
      setItem(TAGS_VIEW, this.tagsViewList)
    },

  }
})

