<template>
  <div class="login-container">
      <van-nav-bar title="标题" />

      <van-cell-group>
  <van-field
    required
    clearable
    label="手机号"
    placeholder="请输入用户名"
  />

  <van-field
    label="验证码"
    placeholder="请输入验证码"
    required
  />
</van-cell-group>

<div>
    <van-button type="info">登录</van-button>
</div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>

<style>

</style>
