function Image({ src, alt, title }) {
  return (
    <img
      className="w-full my-2 object-cover"
      src={src}
      alt={alt}
      title={title}
    />
  );
}

export default Image;
