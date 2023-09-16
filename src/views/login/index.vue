<template>
  <div class="login-background">
        <div id="login-mask"></div>
        <div id="login_box">
            <div id="userImage">
                <img :src="avatarImg" style="height:100%;">
            </div>
            <div class="login_title">欢迎使用TheresaBot</div>
            <div id="pwdDiv" class="input_outer">
                <span class="us_uer"></span>
                <input id="login_pass" name="logpass" class="text" type="password" @keyup.enter="handleSubmit" v-model="userInfo.password" placeholder="输入配置文件中的后台密码">
            </div>
            <div class="loginDiv">
                <a id="loginBtn" @click="handleSubmit" class="act-but submit" href="javascript:;" style="color: #FFFFFF">登录</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import avatarImg from '@/assets/images/avatar.jpg';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/loading';
import type { LoginData } from '@/api/user';

const router = useRouter();
const { loading, setLoading } = useLoading();
const userStore = useUserStore();
const errorMessage = ref('');
const userInfo = reactive({
  password: '',
});

const handleSubmit = async () => {
  try {
    if (loading.value) return;
    setLoading(true);
    const values = { username: 'admin', password: userInfo.password };
    await userStore.login(values as LoginData);
    const { redirect, ...othersQuery } = router.currentRoute.value.query;
    router.push({
      name: (redirect as string) || 'Workplace',
      query: { ...othersQuery, },
    });
    Message.success('欢迎使用');
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    setLoading(false);
  }
};
</script>

<style lang="css" scoped>
*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.clearfix:before,
.clearfix:after {
  content: '';
  display: table;
}

.clearfix:after {
  clear: both;
}

body {
  margin: 0px;
  padding: 0px;
  background: #fff;
  color: #383a3c;
  min-width: 400px;
  height: 100%;
  font-weight: 400;
  font-size: 1em;
  line-height: 1.25;
  font-family: 'Raleway', Calibri, Arial, sans-serif;
}

a,
button {
  outline: none;
}

a {
  color: #566473;
  text-decoration: none;
}

a:hover,
a:focus {
  color: #34495e;
}

section {
  padding: 1em;
  text-align: center;
}

p.ref {
  text-align: center;
  padding: 2em 1em;
}


/* Header */
#userImage {
  border-radius: 50%;
  overflow: hidden;
  width: 120px;
  height: 120px;
  margin: 10px auto 10px;
}

.login-background {
  width: 100%;
  overflow: auto;
  background: url('../../assets/images/login/background.jpg') 70% 50% / cover fixed;
  height: 100vh;
  z-index: -1;
}

#login-mask {
  background-color: #fff;
  opacity: .5;
  height: 100vh;
  z-index: 1;
}

#userImage {
  border-radius: 50%;
  overflow: hidden;
  width: 120px;
  height: 120px;
  margin: 10px auto 10px;
}

#login_box:hover #userImage {
  animation: shake 0.5s;
}

#login_box {
  width: 400px;
  height: 500px;
  padding: 35px;
  color: #EEE;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -250px;
  z-index: 10;
  border-radius: 6%;
  box-shadow: 0 0 0 white;
}

#login_pass {
  color: #eb6e6e !important;
  font-size: 1.5rem !important;
  z-index: 100;
}

#login_pass::placeholder {
  color: rgb(155, 155, 155);
  font-size: 0.7em;
}

#login_pass:-webkit-autofill {  
    -webkit-text-fill-color: #eb6e6e !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    font-size: 1.5rem !important;
    background-color:transparent;
    background-image: none;  
    transition: background-color 50000s ease-in-out 0s;  
}

.login_title {
  text-align: center;
  height: 20px;
  font: 22px "microsoft yahei", Helvetica, Tahoma, Arial, "Microsoft jhengHei", sans-serif;
  color: #000000;
  height: 60px;
  padding: 15px 0 10px 0;
  z-index: 10;
}

.forms {
  width: 280px;
  height: 485px;
}

.logon_inof {
  width: 100%;
  min-height: 450px;
  padding-top: 35px;
  position: relative;
}

.input_outer {
  height: 46px;
  padding: 0 5px;
  border-radius: 50px;
  position: relative;
  border: #b41b22 2px solid !important;
}

#pwdDiv:hover {
  border: #eb6e6e 2px solid !important;
}

.u_user {
  width: 25px;
  height: 25px;
  background: url(../../assets/images/login/login_ico.png);
  background-position: -125px 0;
  position: absolute;
  margin: 10px 13px;
}

.us_uer {
  width: 25px;
  height: 25px;
  background-image: url(../../assets/images/login/login_ico.png);
  background-position: -125px -34px;
  position: absolute;
  margin: 10px 13px;
}

.l-login {
  position: absolute;
  z-index: 1;
  left: 50px;
  top: 0;
  height: 46px;
  font: 14px "microsoft yahei", Helvetica, Tahoma, Arial, "Microsoft jhengHei";
  line-height: 46px;
}

.text {
  width: 250px;
  height: 46px;
  outline: none;
  display: inline-block;
  font: 14px "microsoft yahei", Helvetica, Tahoma, Arial, "Microsoft jhengHei";
  margin-left: 50px;
  border: none;
  background: none;
  line-height: 14px;
}

.loginDiv {
  margin-bottom: 20px
}

.loginDiv a {
  text-decoration: none;
  outline: none;
}

#loginBtn:hover {
  background: #eb6e6e !important;
}

.submit {
  padding: 15px;
  margin-top: 20px;
  display: block;
}

.act-but {
  line-height: 20px;
  text-align: center;
  font-size: 20px;
  border-radius: 50px;
  background: #b41b22;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px) rotate(-5deg);
  }

  50% {
    transform: translateX(5px) rotate(5deg);
  }

  75% {
    transform: translateX(-5px) rotate(-5deg);
  }

  100% {
    transform: translateX(0);
  }
}
</style>

<style lang="css" scoped>
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section,
summary {
  display: block;
}

audio,
canvas,
video {
  display: inline-block;
}

audio:not([controls]) {
  display: none;
  height: 0;
}

[hidden] {
  display: none;
}

html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
}

a:focus {
  outline: thin dotted;
}

a:active,
a:hover {
  outline: 0;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

abbr[title] {
  border-bottom: 1px dotted;
}

b,
strong {
  font-weight: bold;
}

dfn {
  font-style: italic;
}

hr {
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  height: 0;
}

mark {
  background: #ff0;
  color: #000;
}

code,
kbd,
pre,
samp {
  font-family: monospace, serif;
  font-size: 1em;
}

pre {
  white-space: pre-wrap;
}

q {
  quotes: "\201C" "\201D" "\2018" "\2019";
}

small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sup {
  top: -0.5em;
}

sub {
  bottom: -0.25em;
}

img {
  border: 0;
}

svg:not(:root) {
  overflow: hidden;
}

figure {
  margin: 0;
}

fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}

legend {
  border: 0;
  padding: 0;
}

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  margin: 0;
}

button,
input {
  line-height: normal;
}

button,
select {
  text-transform: none;
}

button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}

button[disabled],
html input[disabled] {
  cursor: default;
}

input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}

input[type="search"] {
  -webkit-appearance: textfield;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

textarea {
  overflow: auto;
  vertical-align: top;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>