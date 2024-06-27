import { useMobile } from "@/models/mobile";
import { useNotes } from "@/models/note";
import { Button } from "antd";

export default () => {
  const [{ current }, dispatch] = useNotes();
  const { isMobile } = useMobile();

  const remove = () => {
    if (!current) {
      return;
    }
    dispatch({
      type: "delete",
      payload: { id: current.id },
    });
  };

  const size = isMobile ? "small" : "middle";
  return (
    <Button size={size} className="delete" disabled={!current} onClick={remove}>
      删除
    </Button>
  );
};
