import React from 'react';

interface ISelect {
  label: string;
  data: Array<any>;
  keyValue: string;
  keyName: string;
  onSelect: (data: string | number | boolean) => void;
}

export default function Select({
  data,
  label,
  keyName,
  keyValue,
  onSelect,
}: ISelect) {
  return (
    <>
      <label htmlFor={label}>{label}</label>

      <select onChange={(event) => onSelect(event.target.value)}>
        {data &&
          data.map((element, index) => (
            <option value={element[keyValue]} key={element[keyValue] + index}>
              {element[keyName]}
            </option>
          ))}
      </select>
    </>
  );
}
