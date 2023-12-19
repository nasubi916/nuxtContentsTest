<script setup lang="ts">
const user = useSupabaseUser();
const name = computed(() => user.value?.user_metadata.full_name);
const profile = computed(() => user.value?.user_metadata.avatar_url);

const loggedInLinks = [
  {
    label: "dashboard",
    to: "/dashboard",
    icon: "i-heroicons-book-open-20-solid",
  },
  {
    label: "logout",
    to: "/logout",
  },
];
const loggedOutLinks = [
  {
    label: "login",
    to: "/login",
  },
];
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-end' }">
    <UAvatar :src="profile" label="Open" size="md" />

    <template #panel>
      <div class="p-2">
        <div class="flex justify-center">
          <ColorSelector />
          <div class="items-center text-lg font-bold text-primary text-center">
            <p v-if="user">{{ name }}</p>
            <p v-else>No name</p>
          </div>
        </div>
        <UDivider />
        <UVerticalNavigation
          :links="user ? loggedInLinks : loggedOutLinks"
          class="w-full"
          :ui="{
            label: 'relative text-cool-900 dark:text-white w-32 text-left',
          }"
        >
          <template #default="{ link }">
            <div label="Close">
              <span class="text-primary relative">{{ link.label }}</span>
            </div>
          </template>
        </UVerticalNavigation>
      </div>
    </template>
  </UPopover>
</template>
