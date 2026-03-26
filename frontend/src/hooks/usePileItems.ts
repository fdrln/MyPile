import { useState, useEffect } from "react";
import { getItems, deleteItem } from "../services/pileService";
import { notifications } from "@mantine/notifications";

type BaseItem = {
  id?: number;
  title: string;
};

export function usePileItems<T extends BaseItem>(
  category: string,
  refreshPile: number,
) {
  const [pile, setPile] = useState<T[]>([]);

  useEffect(() => {
    getItems(category).then(setPile);
  }, [category, refreshPile]);

  const removeItem = (item: T) => {
    if (!item.id) return;
    deleteItem(category, item.id).then(() => {
      getItems(category).then(setPile);
      notifications.show({
        title: "Removed from pile",
        message: `${item.title} was removed`,
        color: "gray",
      });
    });
  };

  return { pile, removeItem };
}
