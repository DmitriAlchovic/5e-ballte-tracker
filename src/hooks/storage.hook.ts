import { useState, useCallback, useEffect } from 'react';

export const useStorage = (storageName: string) => {
  const [item, setItem] = useState<any>();

  const createStorage = useCallback((storageItem: any) => {
    setItem(storageItem);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        storageItem,
      })
    );
  }, []);

  const deleteStorage = useCallback(() => {
    setItem([]);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const item = localStorage.getItem(storageName);
    if (item) {
      const data = JSON.parse(item);
      const { storageItem } = data;
      createStorage(storageItem);
    }
  }, []);

  return { item, createStorage, deleteStorage };
};
