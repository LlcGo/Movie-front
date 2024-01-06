
<template>
  <div id="wrapper">
    <header id="js-header">
      <div class="container clearfix">
        <h1 id="logo">
         <img :src="logo">
          罗罗影视
        </h1>
        <nav>
          <a href="#bacon">Bacon</a>
          <a href="#sausage">Sausage</a>
          <a href="#biltong">Biltong</a>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import logo from '../assets/logo.png'
import Footer from "./Footer.vue";

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
  margin-left: -14%;
  width: 280px;
  height: 75px;
  line-height: 55px;
  font-size: 55px;
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
  color: transparent;
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
  color: white;
  font-weight: 300;
}

a:hover {
  color: #3c3c3c;
}

#wrapper {
  width: 100%;
  margin: 0 auto;
}


.container {
  width: 80%;
  margin: 0 auto;
  padding: 0 30px;
}



header {
  width: 100%;
  height: 10em;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-image: url('../assets/headerBackground.png');
  transition: height 0.3s;
}

header h1#logo {
  margin-left: -14%;
  position: relative;
  top: -5px;
  display: inline-block;
  line-height:3em;
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
  color: white;
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
  margin-left: -14%;
  line-height: 75px;
  font-size: 30px;
}

header.smaller nav a {
  line-height: 75px;
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
    margin-left: -14%;
    display: block;
    float: none;
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
    margin-left: -14%;
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


</style>
