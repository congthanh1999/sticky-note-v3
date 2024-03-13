import ControlBar from "../ControlBar";
import NoteList from "../NoteList";
import "./index.css";
import Draggable from "react-draggable";

const MainScreen = ({
  handleAddNewNote,
  handleCloseNote,
  handleOpenNote,
  handleDeleteNote,
  handleDrag,
  handleClick,
  data,
  zIndex,
}) => {
  return (
    <Draggable handle=".control-bar" onStart={handleDrag}>
      <div
        className="main-screen"
        onClick={handleClick}
        style={{ zIndex: `${zIndex}` }}
      >
        <ControlBar
          handleAddNewNote={handleAddNewNote}
          handleCloseNote={handleCloseNote}
        />
        <NoteList
          data={data}
          handleOpenNote={handleOpenNote}
          handleDeleteNote={handleDeleteNote}
        />
      </div>
    </Draggable>
  );
};

export default MainScreen;
