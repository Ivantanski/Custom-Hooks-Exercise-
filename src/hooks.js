import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFlip(initialFlipState = true) {
  const [isFlipped, setIsFlipped] = useState(initialFlipState);

  const toggleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  return [isFlipped, toggleFlip];
}

function useAxios(keyInLS, baseUrl) {
  const [responses, setResponses] = useState([]);

  const fetchData = useCallback(
    async (formatter = data => data, restOfUrl = "") => {
      try {
        const response = await axios.get(`${baseUrl}${restOfUrl}`);
        setResponses(prevResponses => [
          ...prevResponses,
          formatter(response.data),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optional: Display error message to the user
      }
    },
    [baseUrl]
  );

  const clearResponses = useCallback(() => setResponses([]), []);

  useEffect(() => {
    if (keyInLS) {
      fetchData();
    }
  }, [fetchData, keyInLS]);

  return [responses, fetchData, clearResponses];
}

function useLocalStorage(key, initialValue = []) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error parsing localStorage item:", error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    newValue => {
      try {
        setStoredValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error("Error setting localStorage item:", error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}

export default useLocalStorage;
export { useFlip, useAxios, useLocalStorage };
