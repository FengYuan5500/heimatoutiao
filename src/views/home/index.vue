<template>
  <div class="home-container">
    <van-nav-bar title='首页'/>

    <van-tabs v-model="active">
  <van-tab
   :title="channel.name"
   v-for="channel in userChannels"
   :key='channel.id'
  >
   <article-list :channel='channel'/>
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
export default {
  name: 'HomePage',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,
      userChannels: [] // 用户频道列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    // 请求获取数据
    async loadUserChannels () {
      try {
        const { data } = await getUserChannels()
        console.log(data)
        this.userChannels = data.data.channels
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style>

</style>
