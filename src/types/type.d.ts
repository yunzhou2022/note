export interface Note {
  id: string;
  title: string;
  content: string;
}

export type Notes = Map<string, Note>;

export type Action = ActionAdd | ActionDelete | ActionEdit | ActionSwitch;

interface ActionAdd {
  type: "add";
  payload: null;
}

interface ActionDelete {
  type: "delete";
  payload: {
    id: string;
  };
}

interface ActionEdit {
  type: "edit";
  payload: Note;
}

interface ActionSwitch {
  type: "switch";
  payload: {
    id: string;
  };
}
