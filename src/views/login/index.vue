<template>
  <div class="login-container">
    <van-nav-bar title="标题" />

    <ValidationObserver ref='form'>

   <ValidationProvider name='手机号' rules='required|mobile' v-slot="{errors}" immediate>
     <van-field v-model="user.mobile" clearable left-icon="contact" placeholder="请输入用户名">
     </van-field>
   </ValidationProvider>

   <ValidationProvider name='验证码' rules='required|code' immediate>
        <van-field v-model="user.code" left-icon="passed" placeholder="请输入验证码">
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />

          <van-button
            v-else
            slot="button"
            size="small"
            round
            type="primary"
            @click="onSendSmsCode"
          >发送验证码</van-button>
        </van-field>
   </ValidationProvider>
    </ValidationObserver>

    <div class="login-btn-wrap">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onLogin () {
      const user = this.user

      const success = await this.$refs.form.validate()

      if (!success) {
        const errors = this.$refs.form.errors
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            return
          }
        }
        return
      }

      this.$toast.loading({
        duration: 0,
        message: '登录中...',
        forbidClick: true
      })

      try {
        const { data } = await login(user)
        console.log(data)

        // 将登录成功获取的用户token相关数据存储到Vuex容器
        this.$store.commit('setUser', data.data)

        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败，手机号或验证码不正确')
      }
    },
    async onSendSmsCode () {
      try {
        const { mobile } = this.user

        const validateResult = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })
        if (!validateResult.valid) {
          console.log(validateResult)
          this.$toast(validateResult.errors[0])
          return
        }
        // 请求发送短信验证码
        const res = await getSmsCode(mobile)
        console.log(res)

        this.isCountDownShow = true
      } catch (err) {
        // 关闭验证码显示
        this.isCountDownShow = false
        this.$toast('不要频繁操作')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  .login-btn-wrap {
    padding: 27px 16px;
    .van-button {
      width: 100%;
    }
  }
  .van-icon {
    align-items: center;
  }
}
</style>
