export const useConfig = () => {
  const isChip = ref<boolean>(true);
  const chipColor = ref({
    yet: "red",
    still: "yellow",
    done: "blue",
  });

  return {
    isChip,
    chipColor,
  };
};
