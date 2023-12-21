<script setup lang="ts"></script>

<template>
  <div class="h-screen w-screen">
    <div
      class="absolute inset-0 flex justify-center items-center container mx-auto"
    >
      <UCard class="w-1/2 h-92">
        <p class="text-2xl font-bold">仮想本棚</p>
        <UButton>
          <NuxtLink to="/Login"> Log in / Sign up </NuxtLink>
        </UButton>
      </UCard>
    </div>
    <img src="https://source.unsplash.com/random" class="h-screen w-screen" />
  </div>
</template>
