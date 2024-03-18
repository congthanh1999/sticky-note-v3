import { FaPlus, FaTimes, FaEllipsisH } from "react-icons/fa";
import "./index.css";

const ControlBar = ({
  handleAddNewNote,
  handleCloseNote,
  handleOpenMenu,
  inactive,
}) => {
  return (
    <div className={`control-bar ${inactive}`}>
      <button className={`${inactive}`} onClick={handleAddNewNote}>
        <FaPlus />
      </button>
      <div className="right-content">
        <button className={`${inactive}`} onClick={handleOpenMenu}>
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
