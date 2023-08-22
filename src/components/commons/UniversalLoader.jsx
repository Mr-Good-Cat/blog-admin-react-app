function UniversalLoader({ hScreen }) {
  return (
    <div
      className={`flex items-center justify-center ${
        hScreen ? "h-screen" : ""
      }`}
    >
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent border-indigo-600"></div>
    </div>
  );
}

UniversalLoader.defaultProps = {
  hScreen: true,
};

export default UniversalLoader;
