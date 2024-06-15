import React from 'react';

const TextareaField = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  multiple = false,
  required = false,
  label = null,
  disabled = false,
  readOnly = false,
  validations,
}) => {
  return (
    <div>
      <div class="relative w-full min-w-[200px]">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          multiple={multiple}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          className=" mt-7 peer pl-0 h-full max-h-[200px] w-full border-b border-x-0 border-t-0 border-blue-gray-200 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:border-x-0  focus:outline-none disabled:border-0 "
          style={{ resize: '100px', height: '4    0px' }}
        ></textarea>
        <label class="after:content[' '] pointer-events-none absolute left-0 top-0 flex h-full w-full select-none text-[16px] font-bold leading-tight text-gray-500 transition-all after:absolute after:bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-900 after:transition-transform after:duration-300 peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
          {label} <span className="text-[#FE6D00]">*</span>
        </label>
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

export default TextareaField;
