function Input({
  label,
  placeholder,
  value,
  onInput,
  name,
  errorList,
  disabled,
}) {
  return (
    <div>
      <label className="mb-3 block text-black">{label}</label>
      <input
        disabled={disabled}
        type="text"
        value={value}
        onInput={onInput}
        name={name}
        placeholder={placeholder}
        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-gray-50 ${
          errorList.length ? "border-red-600" : ""
        }`}
      />

      <ul className="text-red-600">
        {errorList.map((e) => (
          <li key={e}> - {e}</li>
        ))}
      </ul>
    </div>
  );
}

Input.defaultProps = {
  errorList: [],
};

export default Input;
