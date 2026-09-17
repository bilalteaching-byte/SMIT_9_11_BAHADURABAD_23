function Text({ title, align, size, weight, family, color, fontStyle }) {
  return (
    <p
      style={{
        textAlign: align ?? "center",
        fontSize: size ?? 16,
        fontWeight: weight ?? "normal",
        fontFamily: family ?? "monospace",
        color: color ?? "black",
        fontStyle: fontStyle ?? "normal",
      }}
    >
      {title}
    </p>
  );
}

export default Text;
