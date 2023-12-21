<script setup lang="ts">
const push = usePush();
const { getBooksData, addBook, getUserISBNsData } = useBooks();
const { defaultState } = useConfig();
const inputISBN = ref<string>();
const newUserISBN = ref<UserBook>();
const loading = ref<boolean>(false);
const isModal = ref<boolean>(false);

// user.value?.idをキーにしてデータを登録する
const addBookWrapper = async (newISBN: string | undefined) => {
  // ISBNの形式チェック
  if (newISBN === undefined)
    return push.error({ message: "ISBNが入力されていません" });
  if (!newISBN.match(/^[0-9-]+$/))
    return push.error({ message: "ISBNは数値とハイフンのみです" });
  if (newISBN.length !== 10 && newISBN.length !== 13)
    return push.error({ message: "ISBNは10桁か13桁です" });
  // 既に登録されているかどうかのチェック
  const userISBNs = await getUserISBNsData();
  if (userISBNs.find((userISBN: any) => userISBN.isbn === newISBN))
    return push.error({ message: "ISBNは既に登録されています" });

  // 本のデータを取得する
  loading.value = true;
  newUserISBN.value = {
    id: "",
    user_id: "",
    isbn: newISBN,
    state: defaultState.value,
    book_data: (await getBooksData(newISBN))[0],
    created_at: "",
  };
  loading.value = false;
  isModal.value = true;
};

const confirm = async (newUserBook: UserBook) => {
  await addBook(newUserBook);
  push.success({ message: "本を登録しました" });
  isModal.value = false;
  inputISBN.value = undefined;
  newUserISBN.value = undefined;
};
</script>

<template>
  add...
  <div class="dark flex justify-end">
    <span class="mr-3">{{ defaultState }}</span>
    <div class="flex flex-col gap-3">
      <form
        :disable="loading"
        class="flex flex-row"
        @submit.prevent="addBookWrapper(inputISBN)"
      >
        <UFormGroup label="ISBN" required>
          <UInput
            v-model="inputISBN"
            variant="outline"
            placeholder="input ISBN"
            autocomplete="off"
            name="newIsbn"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                v-show="inputISBN !== undefined"
                variant="link"
                icon="i-heroicons-x-mark-20-solid"
                :padded="false"
                @click="inputISBN = undefined"
              />
            </template>
          </UInput>
        </UFormGroup>
        <UButton
          :loading="loading"
          type="submit"
          class="bg-blue-400 p-2 rounded-lg flex flex-row items-center"
        >
          <span>本を登録</span>
        </UButton>
        <!-- <BarcodeReader /> -->
      </form>
      <div class="flex">
        <URadio v-model="defaultState" label="積読" value="yet" class="mr-3" />
        <URadio
          v-model="defaultState"
          label="読書中"
          value="still"
          class="mr-3"
        />
        <URadio v-model="defaultState" label="読了" value="done" />
      </div>
    </div>
    <UModal v-model="isModal">
      <BookModal v-if="newUserISBN" :book="newUserISBN">
        <div class="flex justify-end">
          <UButton
            :loading="loading"
            icon="i-heroicons-check-20-solid"
            variant="outline"
            class="right-0 bottom-0"
            @click="confirm(newUserISBN)"
          />
        </div>
      </BookModal>
    </UModal>
  </div>
</template>
