<script setup lang="ts">
const isbn = ref<string>();
const decodedText = ref("");

const onLoaded = () => {
  console.log("loaded");
};

const onDecode = (text:string) => {
  decodedText.value = text;
};
</script>

<template>
  <div>
    <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
    <p>ISBN: {{ isbn }}</p>
  </div>
</template>
