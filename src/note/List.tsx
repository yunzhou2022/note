import { Note } from "@/types/type";
import { useNotes } from "@/models/note";
import { useMobile } from "@/models/mobile";
import Delete from "./Delete";

export default () => {
  const [{ notes }] = useNotes();
  return (
    <div className="list">
      {Array.from(notes.values())
        .sort((a, b) => b.editTime - a.editTime)
        .map((note) => {
          return <NoteItem key={note.id} note={note} />;
        })}
    </div>
  );
};

function NoteItem({ note: { id, content, title } }: { note: Note }) {
  const [{ current }, dispatch] = useNotes();
  const { isMobile, setCurrentPage } = useMobile();
  const isFocusiing = !isMobile && current?.id === id;

  const handleClick = () => {
    dispatch({ type: "switch", payload: { id } });
    if (isMobile) {
      setCurrentPage("detail");
    }
  };

  return (
    <div
      className={"note-item" + (isFocusiing ? " focusing" : "")}
      onClick={handleClick}
    >
      <div className="title">{title ?? id}</div>
      {isMobile && <Delete id={id} />}
    </div>
  );
}
