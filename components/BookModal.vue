<script lang="ts" setup>
const { reloadBook, updateBook } = useBooks();
const { chipColor } = useConfig();
const p = defineProps<{
  book: UserBook;
}>();

const isOpen = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const loading = ref<boolean>(false);
const state = ref(JSON.parse(JSON.stringify(p.book)));

const reloadBookDataWrapper = async (userBooks: UserBook) => {
  loading.value = true;
  await reloadBook(userBooks);
  setTimeout(() => {
    isOpen.value = false;
    loading.value = false;
    state.value = p.book;
  }, 1000);
};
const updateData = async () => {
  loading.value = true;
  await updateBook(state.value);
  setTimeout(() => {
    isEdit.value = false;
    loading.value = false;
  }, 1000);
};
</script>

<template>
  <div>
    <div class="p-4">
      <slot />
      <div class="p-1"></div>
      <div class="flex">
        <div class="min-w-48 max-w-48 w-full">
          <img
            src="https://picsum.photos/200/300"
            alt="book"
            class="mb-1 h-72 rounded-md shadow-md"
          />
        </div>
        <div class="p-3"></div>
        <div class="flex flex-col justify-between min-w-[50%]">
          <div v-if="!isEdit" class="flex flex-col gap-2">
            <div>
              <span
                v-if="p.book.state === `yet`"
                :class="`bg-${chipColor.yet}-400`"
                class="p-1 rounded-lg"
                >積読</span
              >
              <span
                v-if="p.book.state === `still`"
                :class="`bg-${chipColor.still}-400`"
                class="p-1 rounded-lg"
                >読書中</span
              >
              <span
                v-if="p.book.state === `done`"
                :class="`bg-${chipColor.done}-400`"
                class="p-1 rounded-lg"
                >読了</span
              >
            </div>
            <span class="text-3xl">{{ p.book.book_data.title }}</span>
            <span class="text-xl"
              ><span class="text-gray-400 text-base">著者: </span>
              {{ p.book.book_data.author }}</span
            >
            <div class="flex flex-col my-5">
              <span class="text-lg"
                ><span class="text-gray-400 text-base">レーベル: </span>
                {{ p.book.book_data.label }}</span
              >
              <span class="text-lg"
                ><span class="text-gray-400 text-base">出版社: </span>
                {{ p.book.book_data.publisher }}</span
              >
              <span class="text-lg"
                ><span class="text-gray-400 text-base">出版日: </span
                >{{ p.book.book_data.date }}</span
              >
              <span v-if="p.book.book_data.price" class="text-lg"
                ><span class="text-gray-400 text-base">定価: </span
                >{{ p.book.book_data.price }}円</span
              >
              <span v-else class="text-lg"
                ><span class="text-gray-400 text-base">定価: </span> 不明</span
              >
            </div>
            <span v-if="p.book.book_data.page" class="text-xl"
              ><span class="text-gray-400 text-base">ページ数: </span>
              {{ p.book.book_data.page }}ページ
            </span>
            <span v-else class="text-xl"
              ><span class="text-gray-400 text-base">ページ数: </span> 不明
            </span>
            <span class="text-sm"
              ><span class="text-gray-400 text-base">ISBN: </span>
              {{ p.book.book_data.isbn }}</span
            >
          </div>
          <div v-else class="flex flex-col gap-2">
            <UForm :state="state" @submit="updateData">
              <div>
                <USelect
                  v-model="state.state"
                  :options="[
                    { label: `積読`, value: `yet` },
                    { label: `読書中`, value: `still` },
                    { label: `読了`, value: `done` },
                  ]"
                  name="state"
                  size="sm"
                />
              </div>
              <div class="flex flex-row">
                <div>
                  <UInput
                    v-model="state.book_data.title"
                    color="primary"
                    variant="outline"
                    placeholder="title"
                    autocomplete="off"
                    name="title"
                    size="lg"
                  />
                  <UInput
                    v-model="state.book_data.author"
                    color="primary"
                    variant="outline"
                    placeholder="author"
                    autocomplete="off"
                    name="author"
                    size="sm"
                  />
                  <div class="flex flex-col my-5">
                    <UInput
                      v-model="state.book_data.label"
                      color="primary"
                      variant="outline"
                      placeholder="label"
                      autocomplete="off"
                      name="label"
                      size="xs"
                    />
                    <UInput
                      v-model="state.book_data.publisher"
                      color="primary"
                      variant="outline"
                      placeholder="publisher"
                      autocomplete="off"
                      name="publisher"
                      size="xs"
                    />
                    <UInput
                      v-model="state.book_data.date"
                      color="primary"
                      variant="outline"
                      placeholder="date"
                      autocomplete="off"
                      name="date"
                      size="xs"
                    />
                    <UInput
                      v-model="state.book_data.price"
                      color="primary"
                      variant="outline"
                      placeholder="price"
                      autocomplete="off"
                      name="price"
                      size="xs"
                    />
                  </div>
                  <UInput
                    v-model="state.book_data.page"
                    color="primary"
                    variant="outline"
                    placeholder="page"
                    autocomplete="off"
                    name="page"
                    size="sm"
                  />
                  <UInput
                    v-model="state.book_data.isbn"
                    color="primary"
                    variant="outline"
                    placeholder="isbn"
                    autocomplete="off"
                    name="isbn"
                    size="2xs"
                  />
                </div>
                <div class="p-3"></div>
                <div class="flex flex-col justify-between mt-auto">
                  <UButton
                    :loading="loading"
                    variant="outline"
                    icon="i-heroicons-check"
                    type="submit"
                  />
                </div>
              </div>
            </UForm>
          </div>
        </div>
      </div>
      <UDivider class="my-1" />
      <div class="flex flex-row gap-2">
        <div class="flex flex-row justify-between items-center">
          <UIcon name="i-heroicons-star-20-solid" variant="outline" />
          <UIcon name="i-heroicons-star-20-solid" variant="outline" />
          <UIcon name="i-heroicons-star-20-solid" variant="outline" />
          <UIcon name="i-heroicons-star-20-solid" variant="outline" />
          <UIcon name="i-heroicons-star-20-solid" variant="outline" />
        </div>
        <div class="flex flex-row ml-auto gap-x-2">
          <UButton
            icon="i-heroicons-arrow-path-rounded-square-20-solid"
            variant="outline"
            @click="isOpen = true"
          />
          <UButton
            icon="i-heroicons-pencil-square-solid"
            variant="outline"
            @click="isEdit = !isEdit"
          />
          <UModal v-model="isOpen">
            <UCard>
              <p class="text-xl text-yellow-500 p-1">確認 情報を初期化します</p>
              <UButton :loading="loading" @click="reloadBookDataWrapper(book)">
                更新する
              </UButton>
            </UCard>
          </UModal>
          <UButton icon="i-heroicons-bookmark" variant="outline" />
          <UButton icon="i-heroicons-book-open" variant="outline" />
        </div>
      </div>
    </div>
  </div>
</template>
