import { useEffect, useState } from "react";
import "./App.css";
import MainScreen from "./components/MainScreen";
import Note from "./components/Note";
import { useNotesContext } from "./hooks/useNotesContext";
import { getRandom } from "../utils/truncate";

function App() {
  const { notes, dispatch } = useNotesContext();
  const [openedIndexes, setOpenedIndexes] = useState(new Set());

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

  const handleAddNewNote = async () => {
    const newNote = {
      id: `${getRandom()}`,
      content: "",
      created_at: new Date().toISOString(),
    };

    dispatch({ type: "CREATE_NOTE", payload: newNote });
    setOpenedIndexes(new Set([...openedIndexes, newNote.id]));

    await fetch(`http://localhost:3000/notes`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newNote),
    });
  };

  const handleDeleteNote = async (id) => {
    const newData = notes.filter((note) => note.id != id);

    dispatch({ type: "SET_NOTES", payload: newData });

    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    });
  };

  const handleOpenNote = (id) => {
    const newOpenedIndexes = new Set([...openedIndexes, id]);

    notes.forEach((note) => {
      if (note.id === id) {
        setOpenedIndexes(newOpenedIndexes);
      }
    });
  };

  const handleCloseNote = (id) => {
    notes.forEach((note) => {
      if (note.id === id) {
        if (note.content === "") {
          handleDeleteNote(note.id);
        } else {
          const newOpenedIndexes = new Set([...openedIndexes]);
          newOpenedIndexes.delete(id);

          setOpenedIndexes(newOpenedIndexes);
        }
      }
    });
  };

  const checkIsOpened = (id) => {
    return openedIndexes.has(id);
  };

  return (
    <div className="app-container">
      <MainScreen
        handleAddNewNote={handleAddNewNote}
        handleOpenNote={handleOpenNote}
        handleDeleteNote={handleDeleteNote}
        data={notes}
      />
      {notes &&
        notes.map((note) => (
          <Note
            key={note.id}
            handleAddNewNote={handleAddNewNote}
            handleCloseNote={() => handleCloseNote(note.id)}
            data={note}
            isOpened={checkIsOpened(note.id)}
          />
        ))}
    </div>
  );
}

export default App;
