function Input({ label, placeholder }) {
  return (
    <div>
      <label className="mb-3 block text-black">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-indigo-600 active:border-indigo-600 disabled:cursor-default disabled:bg-gray-50"
      />
    </div>
  );
}

export default Input;
