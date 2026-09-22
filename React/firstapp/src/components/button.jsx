import "../App.css"

function Button({ title, onClick, className, style }) {
  return (
    <button className={className} onClick={onClick}
      style={style}>
      {title}
    </button>
  );
}

export default Button;
