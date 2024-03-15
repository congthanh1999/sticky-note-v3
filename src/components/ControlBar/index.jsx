import { FaPlus, FaTimes, FaEllipsisH } from "react-icons/fa";
import "./index.css";

const ControlBar = ({
  handleAddNewNote,
  handleCloseNote,
  handleAdjustNoteColor,
  inactive,
}) => {
  return (
    <div className={`control-bar ${inactive}`}>
      <button className={`${inactive}`} onClick={handleAddNewNote}>
        <FaPlus />
      </button>
      <div className="right-content">
        <button onClick={handleAdjustNoteColor}>
          <FaEllipsisH />
        </button>
        <button className={`${inactive}`} onClick={handleCloseNote}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
