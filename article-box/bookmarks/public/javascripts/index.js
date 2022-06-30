(function () {
  var app = new Vue({
    el: '#app',
    data: {
      types: {
        wx: '微信',
        mobile: '移动端',
        other: '其他',
        pc: 'PC端',
        frame: '框架',
        interview: '面试',
        design: '设计',
        media: '新媒体',
        biyao: '必要',
        juejin: '掘金',
        service: '服务器',
        github: 'Github',
        document: '文档',
        tool: '工具',
        engineering: '前端工程化',
        movie: '影视',
        java: '后端',
        canvas: '图表',
        gzh: '公众号',
        toutiao: '头条号'
      },
      columns: [{
        title: 'ID',
        key: 'id'
      }, {
        title: '标题',
        key: 'title'
      }, {
        title: '更新时间',
        key: 'dateTxt'
      }, {
        title: '封面',
        slot: 'cover'
      }, {
        title: '简介',
        key: 'digest'
      }, {
        title: '主类',
        key: 'mTitle'
      }, {
        title: '来源',
        key: 'sourceTxt'
      }, {
        title: '操作',
        slot: 'operate'
      }],
      list: [],
      total: 0,
      page: {
        page: 1,
        limit: 20
      },
      title: '',
      type: '',
      modelVisibal: false,
      addParam: {
        title: '',
        url: '',
        cover: '',
        type: '',
        mTitle: '',
        digest: '',
        source: ''
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      fetchData (index = 1) {
        const _self = this
        _self.page.page = index
        const params = {..._self.page}
        if (this.title) {
          params.title = this.title
        }
        if (this.type) {
          params.type = this.type
        }
        axios.get('/bookmark/', {params: params})
          .then(function (res) {
            if (res.status === 200 && !res.data.code) {
              _self.list = [...res.data.data],
              _self.total = res.data.count
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      onPageChange (page) {
        this.fetchData(page)
      },
      search () {
        this.fetchData(1)
      },
      goTo (idx) {
        window.open(this.list[idx].url, '_blank')
      },
      remove (idx) {
        this.$Message.info('暂时不支持删除')
      },
      showModel () {
        this.addParam = {
          title: '',
          url: '',
          cover: '',
          type: '',
          mTitle: '',
          digest: '',
          source: ''
        }
        this.modelVisibal = true
      },
      addOk () {
        const params = this.addParam
        if (!params.title) {
          this.$Message.warning('标题必填')
          return false
        }
        if (!params.url) {
          this.$Message.warning('链接必填')
          return false
        }
        if (params.type) {
          params.mTitle = this.types[params.type]
        }
        const _self = this
        axios.post('/add/bookmark', params)
          .then(function (res) {
            _self.modelVisibal = false
            if (res.status === 200 && !res.data.code) {
              _self.$Message.success('添加成功')
              _self.fetchData(1)
            }
          })
      },
      addCancel () {
        this.modelVisibal = false
      }
    }
  })
})()