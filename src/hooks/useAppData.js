import { useEffect, useState } from 'react';
import { APP_DATA_STORAGE_KEY, readAppData } from '../data/appData';

export function useAppData() {
  const [initialState] = useState(readAppData);
  const [appData, setAppData] = useState(initialState.data);
  const [hasChanges, setHasChanges] = useState(initialState.shouldInitialize);
  const [storageError, setStorageError] = useState(initialState.error);

  useEffect(() => {
    if (!hasChanges) return;

    try {
      window.localStorage.setItem(APP_DATA_STORAGE_KEY, JSON.stringify({
        ...appData,
        schemaVersion: 1,
        updatedAt: new Date().toISOString(),
      }));
      setStorageError('');
    } catch {
      setStorageError('Browser storage is unavailable or full. Changes may not be saved after you close this tab.');
    }
  }, [appData, hasChanges]);

  function updateAppData(updater) {
    setHasChanges(true);
    setAppData((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater;
      return { ...next, schemaVersion: 1 };
    });
  }

  return { appData, updateAppData, storageError };
}
