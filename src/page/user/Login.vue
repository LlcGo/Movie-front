<template>
  <!--
  This was created based on the Dribble shot by Deepak Yadav that you can find at https://goo.gl/XRALsw
  I'm @hk95 on GitHub. Feel free to message me anytime.
-->

  <section class="user">
    <div class="user_options-container">
      <div class="user_options-text">
        <div class="user_options-unregistered">
          <h2 class="user_unregistered-title">您即将开始电影之旅</h2>
          <p class="user_unregistered-text">点击注册账号</p>
          <button class="user_unregistered-signup" id="signup-button" @click="toRegister">注册</button>
        </div>

        <div class="user_options-registered">
          <h2 class="user_registered-title">准备好进入电影的世界了吗？</h2>
          <p class="user_registered-text">欢迎来到电影的世界</p>
          <button class="user_registered-login"  id="login-button" @click="toLogin">登录</button>
        </div>
      </div>

      <div class="user_options-forms" id="user_options-forms">
        <div class="user_forms-login">
          <h2 class="forms_title">罗罗电影平台</h2>
            <fieldset class="forms_fieldset">
              <div class="forms_field">
                <input  v-model="loginUsername" type="text" placeholder="请输入账户" class="forms_field-input" />
              </div>
              <div class="forms_field">
                <input v-model="loginPassword" type="password" placeholder="请输入密码" class="forms_field-input" />
              </div>
              <div class="forms_field">
                <input v-model="qcCode" type="text" placeholder="请输入验证码" class="forms_field-input" />
              </div>
              <div class="wj" @click="showSecret">
               忘记密码
              </div>
              <img
                  class="login-imgStyle"
                  id="accountImg"
                  :src="imgSrc"
                  @click="refreshAccountImg()"
              />
            </fieldset>
            <div class="forms_buttons">
              <input @click="login"   type="submit"  value="登录" class="forms_buttons-action">
            </div>
        </div>
        <div class="user_forms-signup">
          <h2 class="forms_title">罗罗电影平台</h2>

            <fieldset class="forms_fieldset">
              <div class="forms_field">
                <input v-model="registerUserName" type="text"  placeholder="用户名" class="forms_field-input" />
              </div>
              <div class="forms_field">
                <input v-model="registerPassword" type="password" placeholder="密码" class="forms_field-input" />
              </div>
              <div class="forms_field">
                <input v-model="registerCheckPassword" type="password" placeholder="确认密码" class="forms_field-input" />
              </div>
            </fieldset>
            <div class="forms_buttons">
              <button @click="register" type="submit" class="forms_buttons-action" >注册</button>
            </div>
        </div>
      </div>
    </div>
  </section>
  <div>
    <a-modal v-model:open="open" title="找回密码" @ok="handleOk" @cancel="handleClose">
      <div v-if="!show">
        <a-input v-model:value="userName"  placeholder="请输入您的账号" />
      </div>
      <div v-if="show">
        <a-form
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 8 }"
            autocomplete="off"
        >
          <a-form-item label="第一个问题" >
            <div>{{secret?.question1}}</div>
          </a-form-item>

          <a-form-item
              label="问题答案"
          >
            <a-input v-model:value="answer1" />
          </a-form-item>

          <a-form-item label="第二个问题" >
            <div>{{secret?.question2}}</div>
          </a-form-item>

          <a-form-item
              label="问题答案"
          >
            <a-input v-model:value="answer2" />
          </a-form-item>

        </a-form>

      </div>

    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {UserControllerService} from "../../../generated";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
const userName = ref();
const secret = ref()
const open = ref<boolean>(false);
const signupButton = ref();
const loginButton = ref();
const userForms = ref();
onMounted(()=>{
  signupButton.value = document.getElementById('signup-button');
  loginButton.value = document.getElementById('login-button');
  userForms.value = document.getElementById('user_options-forms');
  signupButton.value.addEventListener('click', () => {
    userForms.value.classList.remove('bounceRight')
    userForms.value.classList.add('bounceLeft')
  }, false)
  /**
   * Add event listener to the "Login" button
   */
  loginButton.value.addEventListener('click', () => {
    userForms.value.classList.remove('bounceLeft')
    userForms.value.classList.add('bounceRight')
  }, false)

  window.localStorage.clear()
  refreshAccountImg();

})
const show = ref(false);
const router =  useRouter();
//注册字段
const registerUserName = ref();
const registerPassword = ref();
const registerCheckPassword = ref();

//登录字段
const loginUsername = ref();
const loginPassword = ref();
const imgSrc = ref();
const qcCode = ref();

const answer1 = ref()
const answer2 = ref();


const handleOk = async () => {
  if(show.value){
    // await UserControllerService.
    const res = sessionStorage.getItem("secretName");
    console.log("数据",res)
    const res1 =  await UserControllerService.getSecretNoUserNameUsingPost(answer1,answer2,res);
    console.log('返回的数据',res1)
    if(res1.code === 0){
      alert('您的密码是'+res1.data)
    }
  }else {
    const res = await UserControllerService.getSecretUsingPost(userName.value);
    console.log('数据',res)
    if(res.code == 40000){
      message.warn(res.message)
      return
    }
    sessionStorage.setItem("secretName",userName.value)
    secret.value = res.data
    show.value = true;
  }

}

const handleClose = () => {
  open.value = false;
  userName.value = null;
  show.value = false;
}
const showSecret = () => {
  open.value = true
}

const login = async () => {
  if(loginUsername.value == null){
    message.warn('请输入账号')
    return
  }
  if(loginPassword.value == null){
    message.warn('请输入密码')
  }
  let data = {
    userAccount: loginUsername.value,
    userPassword:loginPassword.value
  }
  if(!await comparePicCode()){
    return;
  }
  console.log('成功')
  const res = await UserControllerService.userLoginUsingPost(data)
  if(!res.data){
    message.warn(res.message)
    return;
  }
  sessionStorage.setItem('user', JSON.stringify(res.data));
  router.push('/layout')
  // console.log(res)
}

const register = async () => {
  if(registerUserName.value == null){
    message.warn('请输入账户')
  }
  if(registerPassword.value == null){
    message.warn('请输入密码')
  }
  if(registerCheckPassword.value == null){
    message.warn('请输入确认密码')
  }
  let data = {
    checkPassword: registerCheckPassword.value ,
    userAccount: registerUserName.value,
    userPassword: registerPassword.value,
  }
  const res = await UserControllerService.userRegisterUsingPost(data)
  if(!res.data){
    message.warn(res.message);
    return;
  }
  message.success('注册成功')
  userForms.value.classList.remove('bounceLeft')
  userForms.value.classList.add('bounceRight')
}

const toRegister = () => {
  loginUsername.value = null;
  loginPassword.value = null;
}

const toLogin = () => {
  registerUserName.value = null;
  registerPassword.value = null;
  registerCheckPassword.value = null;
}

const refreshAccountImg =  () => {
  window.localStorage.removeItem("loginVerifyCodeRandom");
  let loginVerifyCodeRandom = Math.random();
  //使用 localStorage 创建一个本地存储的 name/value 对
  window.localStorage.setItem("loginVerifyCodeRandom", loginVerifyCodeRandom);
  imgSrc.value = window.location.origin + '/api' +
      "/user"+ "/loginCode/getVerifyCode" + '?num = ' + loginVerifyCodeRandom//给图片地址配一个无用的随机数
  console.log(imgSrc.value)
}

const  comparePicCode = async () => {
  let loginVerifyCodeRandom = window.localStorage.getItem("loginVerifyCodeRandom");
  if(qcCode.value == null){
    message.warn('请输入验证码')
    return false;
  }
  let data = {
      loginVerifyCodeRandom:loginVerifyCodeRandom,
      picCode: qcCode.value,
  };
 const res =  await UserControllerService.comparePicCodeUsingPost('loginCode',data);
 console.log('二维码验证返回消息---------->',res)
  if(!res.code == 0){
    message.warn(res.message)
    refreshAccountImg();
    return false;
  }
  return true;
}

</script>

<style scoped lang="sass">
/**
 * General variables
 */
$bdrds: 3px

$white: #fff
$black: #000
$gray: #ccc
$salmon: #e8716d
$smoky-black: rgba(#222222, .85)

$ff: 'Montserrat', sans-serif
$ff-body: 12px
$ff-light: 300
$ff-regular: 400
$ff-medium: 500

.login-imgStyle
  height: 43px
  width: 150px
  position: relative
  top: 12px
/**
 * General configs
 */
*
  box-sizing: border-box

body
  font-family: $ff
  font-size: $ff-body
  line-height: 1em

button
  background-color: transparent
  padding: 0
  border: 0
  outline: 0
  cursor: pointer

input
  background-color: transparent
  padding: 0
  border: 0
  outline: 0

  &[type="submit"]
    cursor: pointer

  &::placeholder
    font-size: .85rem
    font-family: $ff
    font-weight: $ff-light
    letter-spacing: .1rem
    color: $gray


/**
 * Bounce to the left side
 */
@keyframes bounceLeft
  0%
    transform: translate3d(100%, -50%, 0)

  50%
    transform: translate3d(-30px, -50%, 0)

  100%
    transform: translate3d(0, -50%, 0)

/**
 * Bounce to the left side
 */
@keyframes bounceRight
  0%
    transform: translate3d(0, -50%, 0)

  50%
    transform: translate3d(calc(100% + 30px), -50%, 0)

  100%
    transform: translate3d(100%, -50%, 0)

/**
 * Show Sign Up form
 */
@keyframes showSignUp
  100%
    opacity: 1
    visibility: visible
    transform: translate3d(0, 0, 0)

.wj
  position: absolute
  right: 0
  cursor: pointer

.wj:hover
  color: #1677ff




/**
 * Page background
 */
.user
  display: flex
  justify-content: center
  align-items: center

  width: 100%
  height: 100vh
  background-image: url('../../assets/cool-background (1).png')

  background-size: cover

  &_options-container
    position: relative
    width: 80%

  &_options-text
    display: flex
    justify-content: space-between
    width: 100%
    background-color: $smoky-black
    border-radius: $bdrds


/**
 * Registered and Unregistered user box and text
 */
.user_options-registered,
.user_options-unregistered
  width: 50%
  padding: 75px 45px

  color: $white
  font-weight: $ff-light

.user_registered-title,
.user_unregistered-title
  margin-bottom: 15px
  font-size: 1.66rem
  line-height: 1em

.user_unregistered-text,
.user_registered-text
  font-size: .83rem
  line-height: 1.4em

.user_registered-login,
.user_unregistered-signup
  margin-top: 30px
  border: 1px solid $gray
  border-radius: $bdrds
  padding: 10px 30px

  color: $white
  text-transform: uppercase
  line-height: 1em
  letter-spacing: .2rem

  transition: background-color .2s ease-in-out, color .2s ease-in-out

  &:hover
    color: $smoky-black
    background-color: $gray


/**
 * Login and signup forms
 */
.user_options-forms
  position: absolute
  top: 50%
  left: 30px

  width: calc(50% - 30px)
  min-height: 420px
  background-color: $white
  border-radius: $bdrds
  box-shadow: 2px 0 15px rgba($black, .25)
  overflow: hidden

  transform: translate3d(100%, -50%, 0)
  transition: transform .4s ease-in-out

  .user_forms-login
    transition: opacity .4s ease-in-out, visibility .4s ease-in-out

  .forms
    &_title
      margin-bottom: 45px

      font-size: 1.5rem
      font-weight: $ff-medium
      line-height: 1em
      text-transform: uppercase
      color: $salmon
      letter-spacing: .1rem

    &_field
      &:not(:last-of-type)
        margin-bottom: 20px

    &_field-input
      width: 100%
      border-bottom: 1px solid $gray
      padding: 6px 20px 6px 6px

      font-family: $ff
      font-size: 1rem
      font-weight: $ff-light
      color: darken($gray, 30%)
      letter-spacing: .1rem

      transition: border-color .2s ease-in-out

      &:focus
        border-color: darken($gray, 30%)

    &_buttons
      display: flex
      justify-content: space-between
      align-items: center

      margin-top: 35px

      &-forgot
        font-family: $ff
        letter-spacing: .1rem
        color: $gray
        text-decoration: underline

        transition: color .2s ease-in-out

        &:hover
          color: darken($gray, 10%)

      &-action
        background-color: $salmon
        border-radius: $bdrds
        padding: 10px 35px

        font-size: 1rem
        font-family: $ff
        font-weight: $ff-light
        color: $white
        text-transform: uppercase
        letter-spacing: .1rem

        transition: background-color .2s ease-in-out

        &:hover
          background-color: darken($salmon, 10%)

  .user_forms-signup,
  .user_forms-login
    position: absolute
    top: 70px
    left: 40px

    width: calc(100% - 80px)

    opacity: 0
    visibility: hidden
    transition: opacity .4s ease-in-out, visibility .4s ease-in-out, transform .5s ease-in-out

  .user_forms-signup
    transform: translate3d(120px, 0, 0)

    .forms_buttons
      justify-content: flex-end

  .user_forms-login
    transform: translate3d(0, 0, 0)
    opacity: 1
    visibility: visible


/**
 * Triggers
 */
.user_options-forms
  &.bounceLeft
    animation: bounceLeft 1s forwards

    .user_forms-signup
      animation: showSignUp 1s forwards

    .user_forms-login
      opacity: 0
      visibility: hidden
      transform: translate3d(-120px, 0, 0)

  &.bounceRight
    animation: bounceRight 1s forwards



/**
 * Responsive 990px
 */
@media screen and (max-width: 990px)
  .user_options-forms
    min-height: 350px

    .forms_buttons
      flex-direction: column

    .user_forms-login
      .forms_buttons-action
        margin-top: 30px

    .user_forms-signup,
    .user_forms-login
      top: 40px

  .user_options-registered,
  .user_options-unregistered
    padding: 50px 45px

</style>
