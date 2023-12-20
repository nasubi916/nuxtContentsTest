<script setup lang="ts">
import { materialTheme } from "notivue";
</script>
<template>
  <Notivue v-slot="item">
    <NotivueSwipe :item="item">
      <Notifications :item="item" :theme="materialTheme" />
    </NotivueSwipe>
  </Notivue>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
