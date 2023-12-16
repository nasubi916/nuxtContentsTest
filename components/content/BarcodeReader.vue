<script setup lang="ts">
import { StreamBarcodeReader } from "vue-barcode-reader";
import type {} from "vue-barcode-reader"
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
  <div class="flex justify-center items-center mt-10">
    <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
  </div>
</template>