import NoteSummary from "../NoteSummary";
import "./index.css";
import { truncate } from "../../../utils/utils";

const NoteList = ({ data, handleOpenNote, handleDeleteNote }) => {
  return (
    <div className="note-list">
      {data &&
        data.map((d) => (
          <NoteSummary
            key={d.id}
            summary={
              d.content
                ? truncate(d.content)
                : truncate(`Write your note here!`)
            }
            date={d.updated_at}
            handleOpenNote={() => handleOpenNote(d.id)}
            handleDeleteNote={() => handleDeleteNote(d.id)}
          />
        ))}
    </div>
  );
};

export default NoteList;
