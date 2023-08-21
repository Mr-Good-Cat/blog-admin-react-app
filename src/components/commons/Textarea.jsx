function Textarea({ label, placeholder, value, onInput, name, errorList }) {
  return (
    <div>
      <label className="mb-3 block text-black">{label}</label>
      <textarea
        rows={6}
        value={value}
        onInput={onInput}
        name={name}
        placeholder={placeholder}
        className={`w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-gray-50 ${
          errorList.length ? "border-red-600" : ""
        }`}
      ></textarea>
    </div>
  );
}

Textarea.defaultProps = {
  errorList: [],
};

export default Textarea;
