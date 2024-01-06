
<template>

  <Header/>

   <Footer/>
</template>

<script setup lang="ts">
import logo from '../assets/logo.png'
import Footer from "./Footer.vue";
import Header from "./Header.vue";
function resizeHeaderOnScroll() {
  const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 200,
      headerEl = document.getElementById('js-header');

  if (distanceY > shrinkOn) {
    headerEl.classList.add("smaller");
  } else {
    headerEl.classList.remove("smaller");
  }
}

window.addEventListener('scroll', resizeHeaderOnScroll);




</script>

<style scoped >
header.smaller {
  height: 75px;
}

header.smaller h1#logo {
  width: 280px;
  height: 75px;
  line-height: 55px;
  font-size: 55px;
  margin: 0;
}

header.smaller h1 img {
  height: 50px;
  width: 50px;
}

header.smaller nav a {
  line-height: 75px;
}

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  color: #505050;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 1.8;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1;
  font-weight: 100;
  color: #77C7AC;
}

a {
  text-decoration: none;
  color: #fcfcfc;
  font-weight: 300;
}

a:hover {
  color: #3c3c3c;
}

#wrapper {
  width: 100%;
  margin: 0 auto;
}

#main {
  background-color: #fff;
  height: 2000px;
}

.container {
  width: 80%;
  margin: 0 auto;
  padding: 0 30px;
}

section {
  padding: 60px 0;
}

section h1 {
  font-weight: 700;
  margin-bottom: 10px;
}

section p {
  margin-bottom: 30px;
}

section p:last-child {
  margin-bottom: 0;
}

section.color {
  background-color: #f4f4f4;
}

header {
  width: 100%;
  height: 10em;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  border-bottom:solid 0.5em #f4f4f4;
  background-color: #394e63;
  transition: height 0.3s;
}

header h1#logo {
  display: inline-block;
  line-height:3em;
  margin: 0;
  padding:0 1em;
  float: left;
  font-family: "Open Sans", sans-serif;
  font-size: 60px;
  color: #fcfcfc;
  text-shadow: 0.1em 0.03em skyblue;
  font-weight: 400;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

header h1 img {
  height: 150px;
  width: 150px;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}


header nav {
  display: inline-block;
  float: right;
}

header nav a {
  line-height: 150px;
  margin-left: 20px;
  color: #fcfcfc;
  font-weight: 300;
  font-size: 1em;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

header nav a:hover {
  color: #fd5559;
}

header.smaller {
  height: 75px;
}

header.smaller h1#logo {
  line-height: 75px;
  font-size: 30px;
}

header.smaller nav a {
  line-height: 75px;
}

footer {
  background-color: #3c3c3c;
  text-align: center;
  min-height:17em;
  color: #bababa;
}

footer  a {
  display: inline-block;
  margin: 0;
  text-decoration:underline;
}
footer div.col {
  width:20%;
  display:inline-block;
  vertical-align: top;
}
footer col a {
  display:block;
}

footer ul li a:hover {
  color: #fd5559;
}
footer ul li a {
  color: #bababa;
}
footer div#copy {
  margin-top: 1em;
  padding:0;
}
footer div#copy a {
  color: #fd5559;
}
footer div.container {
  position:relative;

}
footer ul{
  list-style:none;
  margin-top:2em;
  padding:0;
}
footer ul li {
  text-align:left;
  margin:0;
  padding:0;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  content: "";
  clear: both;
  height: 0;
}

@media all and (max-width: 760px) {
  header h1#logo {
    display: block;
    float: none;
    margin: 0 auto;
    height: 100px;
    line-height: 80px;
    text-align: center;
  }

  header nav {
    display: block;
    float: none;
    height: 50px;
    text-align: center;
    margin: 0 auto;
  }

  header nav a {
    line-height: 50px;
    margin: 0 10px;
  }

  header.smaller {
    height: 75px;
  }

  header.smaller h1#logo {
    height: 40px;
    line-height: 40px;
    font-size: 30px;
    width:100%;
  }

  header.smaller nav {
    height: 35px;
  }

  header.smaller nav a {
    line-height: 35px;
  }
  footer div.col {
    width:100%;
    display:inline-block;
    vertical-align: top;
  }
  footer ul li {
    display:inline-block;
    margin:0 0.5em;
    float:left;
  }

}

@media all and (max-width: 600px) {
  .container {
    width: 100%;
  }

  footer a {
    display: block;
  }
}







@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400);
body{
  font-family: 'Source Sans Pro', sans-serif;
  font-weight:300;
  background-color:lightblue;
  color:#FFF;
}
section{
  text-align:center;
}
.footer #button{
  width:35px;
  height:35px;
  border: #727172 12px solid;
  border-radius:35px;
  margin:0 auto;
  position:relative;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}
.footer #button:hover{
  width:35px;
  height:35px;
  border: #3A3A3A 12px solid;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
  position:relative;
}
.footer {
  bottom:0;
  left:0;
  position:fixed;
  width: 100%;
  height: 2em;
  overflow:hidden;
  margin:0 auto;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
  z-index:999;
}
.footer:hover {
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
  height: 10em;
}
.footer #container{
  margin-top:5px;
  width:100%;
  height:100%;
  position:relative;
  top:0;
  left:0;
  background: #3A3A3A;
}
.footer #cont{
  position:relative;
  top:-45px;
  right:190px;
  width:150px;
  height:auto;
  margin:0 auto;
}
.footer_center{
  width:500px;
  float:left;
  text-align:center;
}
.footer h3{
  font-family: 'Helvetica';
  font-size: 30px;
  font-weight: 100;
  margin-top:70px;
  margin-left:40px;
}
</style>
