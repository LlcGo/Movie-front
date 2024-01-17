
<template>
    <div class="footer">
      <div id="button"></div>
      <div id="container">
        <div id="cont">
          <div class="footer_center">
            <h3>Classy footer text</h3>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped >


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
  background-color:lightblue;
  color:#FFF;
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
