<script lang="ts" setup>
import type { UCard } from "#build/components";

const { isChip, chipColor } = useConfig();
</script>

<template>
  <div>
    setting...
    <div class="flex flex-col mt-3">
      <UCard>
        {{ isChip }}
        {{ chipColor }}
        <div class="flex flex-row justify-end items-center">
          <span class="mr-3">チップの表示</span>
          <UCheckbox v-model="isChip" />
        </div>
        <div class="flex flex-row justify-between mt-3">
          <span>チップの色</span>
          <UFormGroup label="積読">
            <USelectMenu
              v-model="chipColor.yet"
              :options="['red', 'blue', 'yellow', 'green', 'purple', 'none']"
            />
          </UFormGroup>
          <UFormGroup label="読書中">
            <USelectMenu
              v-model="chipColor.still"
              :options="['red', 'blue', 'yellow', 'green', 'purple', 'none']"
            />
          </UFormGroup>
          <UFormGroup label="読了">
            <USelectMenu
              v-model="chipColor.done"
              :options="['red', 'blue', 'yellow', 'green', 'purple', 'none']"
            />
          </UFormGroup>
        </div>
      </UCard>
    </div>
  </div>
</template>
