<script setup lang="ts">

const toggleDarkMode = () => {
  // htmlタグにdarkクラスが含まれているかどうか
  if (document.documentElement.classList.contains('dark')) {
    // darkクラスが含まれているならライトモードに変更
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  } else {
    // darkクラスが含まれていないならダークモードに変更
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  }
}
</script>

<template>
  <div>
    <nav>
      <NuxtLink to="/">Home</NuxtLink> |
      <NuxtLink to="/about">About</NuxtLink> |
      <NuxtLink to="/bookList">BookList</NuxtLink>
      <button @click="toggleDarkMode()" class="ml-36">テーマ切り替え</button>
    </nav>
    <slot />
  </div>
</template>