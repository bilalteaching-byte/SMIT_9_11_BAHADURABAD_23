function Text({ title, align, size, weight, family, color, fontStyle, textDecorationLine }) {
  return (
    <p
      style={{
        textAlign: align ?? "center",
        fontSize: size ?? 16,
        fontWeight: weight ?? "normal",
        fontFamily: family ?? "monospace",
        color: color ?? "black",
        fontStyle: fontStyle ?? "normal",
        textDecorationLine: textDecorationLine ?? "normal"
      }}
    >
      {title}
    </p>
  );
}

export default Text;
