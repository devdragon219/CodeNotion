export const isTreePathFragment = (selectedItem: string[], currentItem: string[]) =>
  !currentItem.some((value, index) => value !== selectedItem[index]);
