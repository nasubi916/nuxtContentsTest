<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader'
const decodedText = ref("");

const onDetect = (detectedCodes: any) => {
	decodedText.value = detectedCodes;
	console.log(decodedText.value);
}
</script>

<template>
	<div class="flex">
		<div>
			<qrcode-stream  v-model="decodedText" />
		</div>
		<p>decodedText: {{ decodedText }}</p>
	</div>
</template>
