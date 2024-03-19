import "./index.css";

const colors = [
  { name: "yellow", value: "#d7ad04" },
  { name: "green", value: "#5eae54" },
  { name: "pink", value: "#da7db5" },
  { name: "purple", value: "#a477d1" },
  { name: "blue", value: "#53b3d8" },
  { name: "gray", value: "#8e8e8e" },
  { name: "charcoal", value: "#505050" },
];

const Menu = ({ toggle }) => {
  const handleChoseColor = () => {};

  return (
    <div className={`menu ${toggle}`}>
      <div className={`menu-color`}>
        {colors.map((color) => (
          <div
            key={color.name}
            className="color"
            id={`#${color.name}`}
            style={{ backgroundColor: `${color.value}` }}
            onClick={handleChoseColor}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
