<script lang="ts" setup>
const isbn = ref<string>();

const onDecode = (result: any) => {
  console.log(result);
  isbn.value = result
};
const onLoaded = () => {
  console.log("Barcode reader component loaded.");
};
const onError = (error: any) => {
  console.error(error);
};

</script>

<template>
  <div class="container">
    <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
    <ImageBarcodeReader @decode="onDecode" @error="onError"></ImageBarcodeReader>
    <p>ISBN: {{ isbn }}</p>
  </div>
</template>
