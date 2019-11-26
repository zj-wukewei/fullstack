
import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue, raw) => {
    const [state, setState] = useState(() => {
        try {
            const localStorageValue = localStorage.getItem(key);
            if (typeof localStorageValue !== 'string') {
              localStorage.setItem(key, raw ? String(initialValue) : JSON.stringify(initialValue));
              return initialValue;
            } else {
              return  raw ? localStorageValue : JSON.parse(localStorageValue || 'null');
            }
          } catch {
            return initialValue;
          }
    });

    useEffect(() => {
        try {
            const serializedState = raw ? String(state) : JSON.stringify(state);
          localStorage.setItem(key, serializedState);
        } catch {
         
        }
      }, [key, raw, state]);
    
      return [state, setState];
}

export default useLocalStorage;
