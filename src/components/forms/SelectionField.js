import React from 'react';

const SelectionField = ({
  id,
  name,
  type,
  value,
  onChange,
  required = false,
  icon = null,
  label = null,
  disabled = false,
  validations,
  options = [],
}) => {
  return (
    <div>
      <div className="relative  w-full min-w-[200px] border-none ">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="  peer pl-0 h-full w-full border-b border-x-0 border-t-0 border-blue-gray-200 bg-transparent pt-7 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:border-x-0  focus:outline-none disabled:border-0 "
        >
          <option className="text-sm text-red-500 mt-2" value={''}>
            {''}
          </option>
          {options &&
            options.map((option, index) => (
              <option
                key={index}
                className="text-sm text-red-500 mt-2"
                value={option.value}
              >
                {option.name}
              </option>
            ))}
        </select>
        <label
          htmlFor="password"
          className="after:content[' '] pointer-events-none absolute left-0 top-0 flex h-full w-full  select-none !overflow-visible truncate text-[16px] font-bold  leading-tight text-gray-500 transition-all after:absolute after:bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
        >
          {label} <span className="text-[#FE6D00]">*</span>
        </label>
        {icon && (
          <div className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-black flex justify-center items-center">
            {icon}
          </div>
        )}
      </div>
      {validations &&
        validations.map(
          (validation, index) =>
            (validation.name === name ||
              (validation.name === 'media_uri' && type === 'image')) && (
              <p key={index} className="text-sm text-red-500 mt-2">
                {validation.message}
              </p>
            )
        )}
    </div>
  );
};

export default SelectionField;
