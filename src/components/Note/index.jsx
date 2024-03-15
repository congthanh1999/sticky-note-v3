import { useRef, useState } from "react";
import "./index.css";
import useClickOutside from "../../hooks/useClickOutside";
import Draggable from "react-draggable";
import ControlBar from "../ControlBar";
import { useNotesContext } from "../../hooks/useNotesContext";

const Note = (props) => {
  const [isActive, setIsActive] = useState(false);
  const noteRef = useRef(null);
  const { dispatch } = useNotesContext();

  const handleClickOutside = () => {
    setIsActive(false);
  };

  const handleOnClick = () => {
    setIsActive(true);

    props.handleClick();
  };

  const handleWriteNote = async (event, id) => {
    event.preventDefault();

    const date = new Date().toString();
    const newData = {
      ...props.data,
      content: event.target.value,
      updated_at: date,
    };

    dispatch({
      type: "UPDATE_NOTE",
      payload: newData,
    });

    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newData),
    });
  };

  useClickOutside(noteRef, handleClickOutside);

  return (
    <Draggable
      handle=".control-bar"
      onStart={() => {
        setIsActive(true);
        props.handleDrag;
      }}
    >
      <div
        ref={noteRef}
        className={`note-container ${isActive ? "active" : ""} ${
          props.isOpened ? `opened` : ``
        }`}
        style={{ zIndex: `${props.zIndex}` }}
        onClick={handleOnClick}
      >
        <ControlBar
          handleAddNewNote={props.handleAddNewNote}
          handleCloseNote={props.handleCloseNote}
          inactive={isActive ? `` : `inactive`}
        />
        <div className="note-content">
          <textarea
            placeholder="Write your note here!"
            defaultValue={props.data.content}
            onChange={(event) => handleWriteNote(event, props.data.id)}
            spellCheck={false}
          ></textarea>
        </div>
      </div>
    </Draggable>
  );
};

export default Note;
