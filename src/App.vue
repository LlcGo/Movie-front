
<template>
  <router-view />
</template>

<script setup lang="ts">
import socket from "./utils/websocket.ts";

socket.init()

</script>

<style>


</style>
