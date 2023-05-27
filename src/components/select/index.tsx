import React from 'react';

interface ISelect {
  label: string;
  data: Array<any>;
  keyValue: string;
  keyName: string;
  isDisabled: boolean;
  defaultText: string;
  onSelect: (data: string | number | boolean) => void;
}

export default function Select({
  data,
  label,
  keyName,
  keyValue,
  isDisabled,
  defaultText,
  onSelect,
}: ISelect) {
  return (
    <>
      <label htmlFor={label}>{label}</label>

      <select
        onChange={(event) => onSelect(event.target.value)}
        defaultValue={''}
        disabled={isDisabled}
      >
        <option value="" disabled>
          {defaultText}
        </option>
        {data &&
          data.map((element, index) => (
            <option
              value={element[keyValue]}
              key={`${element[keyValue]}/${index}`}
            >
              {element[keyName]}
            </option>
          ))}
      </select>
    </>
  );
}
