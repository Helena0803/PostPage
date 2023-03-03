import { useEffect, useState } from "react";

export const getIssuees = (numb) => {
  const tmp = numb % 10;
  if (tmp === 1) return "пост";
  if (tmp > 1 && tmp < 5) return "поста";
  if (tmp > 4 || !numb) return "постов";
};
//задержка для отправки на сервер данных введенных в строку поиска(все слово целиком, а не по одному символу)
export const useDebounce = (value, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value]);
  return debounceValue;
};
