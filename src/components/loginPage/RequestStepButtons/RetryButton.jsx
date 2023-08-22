function RetryButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-2 rounded-lg border border-stroke p-4 w-full bg-green-100 hover:bg-blue-100 font-semibold"
    >
      Retry
    </button>
  );
}

export default RetryButton;
