import { Note } from "@/types/type";
import { useNotes } from "@/models/note";

export default () => {
  const [{ current }] = useNotes();
  return (
    <div className="note-content">
      <div className="title">{current?.title}</div>
      <div className="content">{current?.content}</div>
    </div>
  );
};
