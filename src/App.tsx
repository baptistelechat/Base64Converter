import { useState } from "react";
import { FileButton, Button, Group } from "@mantine/core";
import "./App.css";
import UploadImage from "./component/UploadImage";

const App = () => {
  const [files, setFiles] = useState<File[] | null>(null);

  return (
    <div id="app">
      <Group position="center">
        <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
          {(props) => (
            <Button id={"fileButton"} {...props}>
              Charger une image
            </Button>
          )}
        </FileButton>
      </Group>
      <div className="content">
        {files &&
          files.map((file, index) => <UploadImage key={index} file={file} />)}
      </div>
    </div>
  );
};

export default App;
