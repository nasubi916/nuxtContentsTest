<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader'
const isbn = ref<string>();
const decodedText = ref("");

const onDetect = (detectedCodes: any) => {
	isbn.value = detectedCodes;
	console.log(isbn.value);
}
</script>

<template>
	<div class="flex">
		<qrcode-stream @detect="onDetect"></qrcode-stream>
		<p>ISBN: {{ isbn }}</p>
	</div>
</template>
