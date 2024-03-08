import { FaPlus, FaTimes } from "react-icons/fa";
import "./index.css";

const ControlBar = ({ handleAddNewNote, handleCloseNote }) => {
  return (
    <div className="control-bar">
      <button onClick={handleAddNewNote}>
        <FaPlus />
      </button>
      <button onClick={handleCloseNote}>
        <FaTimes />
      </button>
    </div>
  );
};

export default ControlBar;
