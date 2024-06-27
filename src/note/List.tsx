import { Note } from "@/types/type";
import { useNotes } from "@/models/note";

export default () => {
  const [{ notes }] = useNotes();
  return (
    <div className="list">
      {Array.from(notes.values()).map((note) => {
        return <NoteItem key={note.id} note={note} />;
      })}
    </div>
  );
};

function NoteItem({ note: { id, content, title } }: { note: Note }) {
  const [{ current }, dispatch] = useNotes();
  const isFocusiing = current?.id === id;
  const handleClick = () => {
    dispatch({ type: "switch", payload: { id } });
  };

  return (
    <div
      className={"note-item" + (isFocusiing ? " focusing" : "")}
      onClick={handleClick}
    >
      {title ?? id}
    </div>
  );
}
