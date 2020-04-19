import React, { useState, useEffect, useCallback } from 'react';
import { UseRequest } from './UseRequest';
import { Item } from './Item';
interface ItemData {
  id: number;
  name: string;
  price: number;
}
type OnCheckedChange<T> = (item: T, checked: boolean) => any;
type CheckedMap = {
  [id: number]: boolean;
};
export const App = () => {
  const url = 'http://localhost:8181/cartData.json';
  const cartData = UseRequest(url);
  // 商品勾选
  const [checkedMap, setCheckedMap] = useState<CheckedMap>({});
  const onCheckedChange: OnCheckedChange<ItemData> = (cartItem, checked) => {
    const { id } = cartItem;
    const newCheckedMap = Object.assign({}, checkedMap, {
      [id]: checked,
    });
    setCheckedMap(newCheckedMap);
  };
  /** 筛选出勾选项 可以传入filter函数继续筛选 */
  const filterChecked = () => {
    return (
      Object.entries(checkedMap)
        // 通过这个filter 筛选出所有checked状态为true的项
        .filter((entries) => Boolean(entries[1]))
        // 再从cartData中根据id来map出选中列表
        .map(([checkedId]) =>
          cartData.find(({ id }) => id === Number(checkedId)),
        )
    );
  };
  const sumPrice = (cartItems: ItemData[]) => {
    return cartItems.reduce((sum, cur) => sum + cur.price, 0);
  };
  let a = filterChecked();
  console.log(a);
  const total1 = a.reduce((sum, item) => {
    console.log(item);
    if (item) {
      return sum + item.price;
    } else {
      return 0;
    }
  }, 0);
  return (
    <div>
      {cartData.map((v) => {
        return <Item key={v.id} item={v} onCheckedChange={onCheckedChange} />;
      })}
      <div className='item'>
        <input type='checkbox' />
        <span>全选</span>
        <span>总价{total1}</span>
      </div>
    </div>
  );
};
