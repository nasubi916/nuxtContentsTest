<script setup lang="ts">
const isModalOpen = ref<boolean>(false);
</script>

<template>
  <div>
    <nav class="bg-primary-400 p-2 flex items-center">
      <ULink to="/" class="mr-2 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M9 3v15h3V3zm3 2l4 13l3-1l-4-13zM5 5v13h3V5zM3 19v2h18v-2z"
          ></path>
        </svg>
        <p class="font-extrabold text-3xl text-white">Virtual BookShelf</p>
      </ULink>
      <UButton variant="link" class="ml-auto mr-2" @click="isModalOpen = true">
        <SVGhamburger />
      </UButton>
      <AccountMenu class="mr-2" />
    </nav>
    <USlideover v-model="isModalOpen">
      <div class="p-4 flex-1">
        色々いじれるゾーン
        <BookSearcher />
        <BookAdder />
        setting...
        <Placeholder class="h-full" />
      </div>
    </USlideover>
    <slot />
  </div>
</template>
