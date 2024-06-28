import { useMobile } from "@/models/mobile";
import { useNotes } from "@/models/note";
import { Button } from "antd";
import { MouseEvent } from "react";

export default ({ id: _id }: { id?: string }) => {
  const [{ current }, dispatch] = useNotes();
  const { isMobile } = useMobile();

  const remove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    let id = _id;
    if (current) {
      id = current.id;
    }

    if (id) {
      dispatch({
        type: "delete",
        payload: { id },
      });
    }
  };

  const size = isMobile ? "small" : "middle";
  return (
    <Button
      size={size}
      className="delete"
      disabled={!isMobile && !current}
      onClick={remove}
    >
      删除
    </Button>
  );
};
