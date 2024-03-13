import { FaPlus, FaTimes } from "react-icons/fa";
import "./index.css";

const ControlBar = ({ handleAddNewNote, handleCloseNote, inactive }) => {
  return (
    <div className={`control-bar ${inactive}`}>
      <button className={`${inactive}`} onClick={handleAddNewNote}>
        <FaPlus />
      </button>
      <button className={`${inactive}`} onClick={handleCloseNote}>
        <FaTimes />
      </button>
    </div>
  );
};

export default ControlBar;
