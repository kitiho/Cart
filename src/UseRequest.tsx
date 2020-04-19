import { useState, useEffect } from 'react';
import axios from 'axios';
interface ItemData {
  id: number;
  name: string;
  price: number;
}
interface CartData {
  success: boolean;
  data: ItemData;
}
export const UseRequest = (url: string) => {
  const [cartData, setCartData] = useState<ItemData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url);
      setCartData(res.data.data);
    };
    fetchData();
  }, [url]);
  return cartData;
};
