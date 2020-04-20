import React from 'react';
import './style.css';
interface ItemData {
  id: number;
  name: string;
  price: number;
}
type OnCheckedChange<T> = (item: T, checked: boolean) => any;
interface Props {
  item: ItemData;
  checked: boolean;
  onCheckedChange: OnCheckedChange<ItemData>;
}

export const Item: React.FC<Props> = ({ item, onCheckedChange, checked }) => {
  const { name, price, id } = item;
  return (
    <div className='item'>
      <input
        type='checkbox'
        checked={checked}
        name={id + ''}
        onChange={(e) => {
          onCheckedChange(item, e.target.checked);
        }}
      />
      <span>{name}</span>
      <span>{price}</span>
    </div>
  );
};
