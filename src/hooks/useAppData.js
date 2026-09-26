import { useEffect, useState } from 'react';
import { APP_DATA_STORAGE_KEY, EMPTY_APP_DATA, readAppData } from '../data/appData';

// Keep about 1 MB free under the commonly available 5 MB localStorage quota.
const MAX_STORAGE_BYTES = 4 * 1024 * 1024;

export function useAppData() {
  const [initialState] = useState(readAppData);
  const [appData, setAppData] = useState(initialState.data);
  const [hasChanges, setHasChanges] = useState(false);
  const [storageError, setStorageError] = useState(initialState.error);

  useEffect(() => {
    if (!hasChanges) return;

    try {
      const serializedData = JSON.stringify(appData);
      if (serializedData.length * 2 > MAX_STORAGE_BYTES) {
        throw new Error('Your saved data is too large for this browser. Remove long notes or older records.');
      }

      window.localStorage.setItem(APP_DATA_STORAGE_KEY, serializedData);
      setStorageError('');
    } catch (error) {
      setStorageError(error.message || 'Browser storage is unavailable or full. Changes may not be saved after you close this tab.');
    }
  }, [appData, hasChanges]);

  function updateAppData(updater) {
    setHasChanges(true);
    setAppData((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater;
      return next;
    });
  }

  function clearAppData() {
    try {
      window.localStorage.removeItem(APP_DATA_STORAGE_KEY);
      setAppData(EMPTY_APP_DATA);
      setHasChanges(false);
      setStorageError('');
      return true;
    } catch {
      setStorageError('Could not clear saved data from this browser. Please try again.');
      return false;
    }
  }

  return { appData, updateAppData, clearAppData, storageError };
}
