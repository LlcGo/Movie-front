<template>
    <div class="otherChat">
      <a-avatar class="other" size="large">
        <template #icon>
          <UserOutlined/>
        </template>
      </a-avatar>
      <div class="otherLl">
        {{ props.msg }}
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


.otherChat {
  margin-top: 2%;
  position: relative;
  margin-left: 1%;
}

.other {
  position: relative;
}

.otherLl {
  position: absolute;
  left: 48px;
  top: 9px;
  max-width: 50%;
  line-height: 1.5;
  font-size: 14px;
  min-height: 37px;
  padding: 8px 16px;
  word-wrap: break-word;
  word-break: break-word;
  border-radius: 0 16px 16px 16px;
  overflow: hidden;
  background: #fff;
}


</style>
