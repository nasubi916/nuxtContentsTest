<script lang="ts" setup>
import { StreamBarcodeReader } from "vue-barcode-reader";
const isbn = ref<string>();

const onDecode = (result: any) => {
  console.log(result);
  isbn.value = result
};
const onLoaded = () => {
  console.log("Barcode reader component loaded.");
};
</script>

<template>
  <div>
    <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
  </div>
</template>
