import "./index.css";
import { FaRegTrashAlt } from "react-icons/fa";

const NoteSummary = ({
  summary,
  date,
  time,
  handleOpenNote,
  handleDeleteNote,
  borderColor 
}) => {
  return (
    <div className="note-summary" onDoubleClick={handleOpenNote} style={{borderTop:`5px solid ${borderColor}`}}>
      <p className="short-content">{summary}</p>
      <div className="right-content">
        <div className="date-time">
          <p className="date">{date}</p>
          <p className="time">{time}</p>
        </div>
        <button onClick={handleDeleteNote}>
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default NoteSummary;
