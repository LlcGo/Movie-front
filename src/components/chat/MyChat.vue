<template>
      <div class="myContain">
          <a-avatar class="my" size="large">
            <template #icon>
              <UserOutlined/>
            </template>
          </a-avatar>
          <div class="ll">
            {{props.msg}}
          </div>
      </div>
</template>
<script setup lang="ts">
const props = defineProps({
  msg: {
    type: String,
    default: "",
  },
})

</script>

<style scoped>



.myContain {
  margin-right: 23px;
  margin-top: 2%;
  position: relative;
}

.my {
  margin-top: -1%;
  left: 96%;
}


.ll {
  float: right;
  position: relative;
  right: 4.5%;
  top: -4px;
  max-width: 50%;
  line-height: 1.5;
  font-size: 14px;
  min-height: 37px;
  padding: 8px 16px;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
  background: #80b9f2;
  border-radius: 16px 0 16px 16px;
}



</style>
