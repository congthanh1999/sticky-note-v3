import ControlBar from "../ControlBar";
import NoteList from "../NoteList";
import "./index.css";
import Draggable from "react-draggable";

const MainScreen = ({
  handleAddNewNote,
  handleCloseNote,
  handleOpenNote,
  handleDeleteNote,
  data,
}) => {
  return (
    <Draggable handle=".control-bar">
      <div className="main-screen">
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
