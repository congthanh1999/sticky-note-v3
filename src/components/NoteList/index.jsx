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
            date={
              /*`${new Intl.DateTimeFormat("en-US").format(d.created_at)}`*/ d.created_at
            }
            // time={`${d.createdAt.getTime()}`}
            handleOpenNote={() => handleOpenNote(d.id)}
            handleDeleteNote={() => handleDeleteNote(d.id)}
          />
        ))}
    </div>
  );
};

export default NoteList;
