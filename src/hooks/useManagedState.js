import { useState, useEffect } from "react";
import LZString from "lz-string";

export default function useManagedState(defaultValue) {
  const [key, setKey] = useState(null);
  const [sessionStorageState, setSessionStorageState] = useState(null);

  // Generate a stable key asynchronously
  useEffect(() => {
    const generateKey = async () => {
      const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(JSON.stringify(defaultValue))
      );
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
      setKey(`useManagedState-${hashHex}`);
    };

    generateKey();
  }, [defaultValue]);

  // Initialize state from sessionStorage when the key is ready
  useEffect(() => {
    if (key) {
      const storedValue = sessionStorage.getItem(key);
      if (storedValue) {
        try {
          const decompressed = LZString.decompressFromUTF16(storedValue);
          setSessionStorageState(decompressed ? JSON.parse(decompressed) : defaultValue);
        } catch (e) {
          console.error("Error decompressing or parsing:", e);
          setSessionStorageState(defaultValue);
        }
      } else {
        setSessionStorageState(defaultValue); // If no value is found, use the default
      }
    }
  }, [key, defaultValue]);

  const setState = (newState) => {
    if (key) {
      try {
        const compressed = LZString.compressToUTF16(JSON.stringify(newState));
        sessionStorage.setItem(key, compressed);
        setSessionStorageState(newState);
      } catch (e) {
        console.error("Error compressing or storing:", e);
      }
    }
  };

  return [sessionStorageState ?? defaultValue, setState];
}
