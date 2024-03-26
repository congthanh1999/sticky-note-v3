import { useEffect, useRef, useState } from "react";
import "./App.css";
import MainScreen from "./components/MainScreen";
import Note from "./components/Note";
import { useNotesContext } from "./hooks/useNotesContext";
import { getRandom } from "../utils/utils";

function App() {
  const { notes, dispatch } = useNotesContext();
  const [activeList, setActiveList] = useState(["10000"]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/notes");
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_NOTES", payload: json });
      }
    };

    fetchData();
  }, [dispatch]);

  const handleActiveList = (id) => {
    setActiveList((prev) => {
      const currentActiveList = Array.from(new Set([...prev, id]));
      let newActiveList = currentActiveList.filter((item) => item !== id);
      newActiveList = [...newActiveList, id];
      return newActiveList;
    });
  };

  const checkIsOpened = (id) => {
    return activeList.includes(id);
  };

  const handleAddNewNote = async () => {
    const date = new Date().toString();
    const newNote = {
      id: `${getRandom()}`,
      content: "",
      color: "#d7ad04",
      created_at: date,
      updated_at: date,
    };

    dispatch({ type: "CREATE_NOTE", payload: newNote });

    await fetch(`http://localhost:3000/notes`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newNote),
    });

    handleActiveList(newNote.id);
  };

  const handleDeleteNote = async (id) => {
    const newData = notes.filter((note) => note.id != id);

    dispatch({ type: "SET_NOTES", payload: newData });

    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    });

    setActiveList((prev) => prev.filter((item) => item !== id));
  };

  const handleOpenNote = (id) => {
    handleActiveList(id);
  };

  const handleCloseNote = (event, id) => {
    event.stopPropagation();

    if (notes.find((note) => note.id === id)?.content === "") {
      handleDeleteNote(id);
    } else {
      setActiveList((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleClick = (id) => {
    handleActiveList(id);
  };

  return (
    <div className="app-container">
      <MainScreen
        handleAddNewNote={handleAddNewNote}
        handleOpenNote={handleOpenNote}
        handleDeleteNote={handleDeleteNote}
        handleDrag={() => handleClick("10000")}
        handleClick={() => handleClick("10000")}
        data={notes}
        zIndex={activeList.indexOf("10000")}
      />
      {notes &&
        notes.map((note) => (
          <Note
            key={note.id}
            handleAddNewNote={handleAddNewNote}
            handleCloseNote={(event) => handleCloseNote(event, note.id)}
            data={note}
            isOpened={checkIsOpened(note.id)}
            handleDrag={() => handleClick(note.id)}
            handleClick={() => handleClick(note.id)}
            zIndex={activeList.indexOf(note.id)}
            backgroundColor={note.color}
            inputRef={inputRef}
          />
        ))}
    </div>
  );
}

export default App;
