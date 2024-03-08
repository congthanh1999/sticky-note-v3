import { useRef, useState } from "react";
import "./index.css";
import useClickOutside from "../../hooks/useClickOutside";
import Draggable from "react-draggable";
import ControlBar from "../ControlBar";
import { useNotesContext } from "../../hooks/useNotesContext";

const Note = (props) => {
  const [isActive, setIsActive] = useState(false);
  // const [data, setData] = useState(props.data);
  const noteRef = useRef(null);
  const { dispatch } = useNotesContext();
  const [zIndex, setZIndex] = useState(999);

  const handleClickOutside = () => {
    setIsActive(false);
    setZIndex((prev) => --prev);
  };

  const handleOnClick = () => {
    setIsActive(true);
    setZIndex(999);
  };

  const handleDrag = () => {
    setZIndex(999);
  };

  const handleWriteNote = async (event, id) => {
    event.preventDefault();

    const newData = { ...props.data, content: event.target.value };
    // setData(newData);

    dispatch({
      type: "UPDATE_NOTE",
      payload: newData,
    });

    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newData),
    });
  };

  useClickOutside(noteRef, handleClickOutside);

  return (
    <Draggable handle=".control-bar" onStart={handleDrag}>
      <div
        ref={noteRef}
        className={`note-container ${isActive ? "active" : ""} ${
          props.isOpened ? `opened` : ``
        }`}
        style={{ zIndex: `${zIndex}` }}
        onClick={handleOnClick}
      >
        <ControlBar
          handleAddNewNote={props.handleAddNewNote}
          handleCloseNote={props.handleCloseNote}
        />
        <div className="note-content">
          <textarea
            placeholder="Write your note here!"
            defaultValue={props.data.content}
            onChange={(event) => handleWriteNote(event, props.data.id)}
          ></textarea>
        </div>
      </div>
    </Draggable>
  );
};

export default Note;
