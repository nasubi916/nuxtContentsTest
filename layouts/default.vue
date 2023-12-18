<script setup lang="ts"></script>

<template>
  <div>
    <nav class="justify-start bg-primary-400 p-2 flex items-center">
      <ULink to="/" class="mr-2 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="5em"
          height="5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9 3v15h3V3zm3 2l4 13l3-1l-4-13zM5 5v13h3V5zM3 19v2h18v-2z"
          ></path>
        </svg>
        <p class="font-extrabold text-3xl text-cool">Virtual BookShelf</p>
      </ULink>
      <UIcon name="i-heroicons-book-open" class="w-full h-full" />
      <AccountMenu class="mr-2" />
    </nav>
    <slot />
  </div>
</template>
