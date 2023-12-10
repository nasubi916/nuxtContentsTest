<template>
  <main>
    <ContentDoc>
      <template #not-found>
        <div class="top-0 left-0 w-full h-full flex justify-center items-center">
          <div class="text-3xl font-bold text-center">
            <p class="text-8xl text-red-600">404</p>
            Document not found
          </div>
        </div>
      </template>
    </ContentDoc>
  </main>
</template>
