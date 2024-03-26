import { useNotesContext } from "../../hooks/useNotesContext";
import "./index.css";
import { colors } from "../../../utils/colors";

const Menu = ({ toggle, data }) => {
  const { dispatch } = useNotesContext();

  const handleChooseColor = async (color) => {
    const newData = { ...data, color: color };

    dispatch({ type: "UPDATE_NOTE_COLOR", payload: newData });

    await fetch(`http://localhost:3000/notes/${data.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newData),
    });
  };

  return (
    <div className={`menu ${toggle}`}>
      <div className={`menu-color`}>
        {colors.map((color) => (
          <div
            key={color.name}
            className="color"
            id={`#${color.name}`}
            style={{ backgroundColor: `${color.value}` }}
            onClick={() => handleChooseColor(color.value)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
