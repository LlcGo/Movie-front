
<template>
  <div class="box">
    <div class="lt">
      <a-textarea
          :auto-size="{ minRows: 5, maxRows: 10 }"
          placeholder="Autosize height with minimum and maximum number of lines"
          v-model:value="chat"  />
    </div>

    <div class="myContain">
      <div class="myChat">
        <a-avatar class="my" size="large">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <div class="ll">
          6666666666
        </div>
      </div>
    </div>


      <div class="otherChat">
        <a-avatar class="other" size="large">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <div class="otherLl">
          6666666666
        </div>
      </div>


    <div class="otherChat">
      <a-avatar class="other" size="large">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <div class="otherLl">
        6666666666
      </div>
    </div>

    <a-button class="chatButton" type="primary">发送</a-button>

  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";

const chat = ref()
</script>

<style scoped>
.box{
  position: relative;
  height: 80vh;
  width: 80vw;
  background: aliceblue;
  margin: 50px auto;
}
.lt{
  position: absolute;
  width: 100%;
  bottom: 0;
}
.chatButton{
  position: absolute;
  bottom: 6px;
  right: 7px;
}


.myContain{
  position: relative;
  height: 10%;
}
.my{
  position: absolute;
  right: 10px;
  top:50px
}
.myChat{
  right: 0;
  background: red;
  width: 50%;
  position: absolute;
}
.ll{
  padding: 12px;
  top: 56px;
  position: absolute;
  height: 45px;
  right: 58px;
  background: #80b9f2;
  border-radius: 16px 0 16px 16px;
}





.otherChat{
  margin-top: 5%;
  position: relative;
}

.other{
  left: 10px;
}
.otherLl{
  position: absolute;
  top: 3px;
  left: 57px;
  padding: 12px;
  height: 45px;
  background: white;
  border-radius: 0 16px 16px 16px;
}
</style>
