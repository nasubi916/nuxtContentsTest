<script setup lang="ts">
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
const isbn = ref<string>();
const decodedText = ref("");

const onDetect = (payload: any) => {
	console.log(payload);
	isbn.value = payload;
	decodedText.value = payload;
	console.log(isbn.value);
	console.log(decodedText.value);
}
</script>

<template>
	<div>
		<qrcode-stream @detect="onDetect"></qrcode-stream>
		<qrcode-drop-zone></qrcode-drop-zone>
		<qrcode-capture></qrcode-capture>
		<p>ISBN: {{ isbn }}</p>
	</div>
</template>
