import "../App.css"

function Button({ title, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
