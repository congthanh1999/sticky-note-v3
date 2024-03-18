import { createContext, useReducer } from "react";
import { noteDateTimeComparator } from "../../utils/utils";

export const NotesContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        notes: action.payload.sort((a, b) => noteDateTimeComparator(a, b)),
      };
    case "CREATE_NOTE":
      return {
        notes: [action.payload, ...state.notes],
      };
    case "UPDATE_NOTE":
      return {
        notes: state.notes
          .map((note) =>
            note.id === action.payload.id
              ? {
                  ...note,
                  content: action.payload.content,
                  updated_at: action.payload.updated_at,
                }
              : note
          )
          .sort((a, b) => noteDateTimeComparator(a, b)),
      };
    case "UPDATE_NOTE_COLOR":
      return {
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? { ...note, color: action.payload }
            : note
        ),
      };
    default:
      return state;
  }
};

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: null,
  });

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
