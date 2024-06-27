import { Button, Input } from "antd";
import List from "./List";
import Content from "./Content";
import './index.less';

export default function HomePage() {
  return (
    <div className="note">
      <header>
        <Button className="add" type="primary">
          新建
        </Button>
        <Button className="delete">删除</Button>
        <Input placeholder="hhhhh"/>
      </header>
      <main>
        <List />
        <Content />
      </main>
    </div>
  );
}
