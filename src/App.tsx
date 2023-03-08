import { useState } from "react";
import {
  FileButton,
  Button,
  Group,
  Text,
  CopyButton,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import "./App.css";
import { IconCheck, IconCopy } from "@tabler/icons-react";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [logo, setLogo] = useState<string>("");

  const handleUploadFile = (file: File | null) => {
    if (!file) {
      return;
    }

    setFile(file);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const base64String = fileReader.result as string;
      if (base64String !== null) {
        setLogo(base64String);
      }
    };
  };

  return (
    <div id="app">
      <Group position="center">
        <FileButton
          onChange={(file) => handleUploadFile(file)}
          accept="image/png,image/jpeg"
        >
          {(props) => <Button {...props}>Charger une image</Button>}
        </FileButton>
      </Group>

      {logo !== "" ? <img src={logo} alt="logo" /> : <></>}

      {file && (
        <div className="content">
          <p className="title">Fichier sélectionné : {file.name}</p>
          <div>
            <div className="copyButton">
              <p className="title">Base64 :</p>
              <CopyButton value={logo} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? "Copied" : "Copy"}
                    withArrow
                    position="right"
                  >
                    <ActionIcon
                      variant={"filled"}
                      color={copied ? "teal" : "blue"}
                      onClick={copy}
                    >
                      {copied ? (
                        <IconCheck size="1rem" />
                      ) : (
                        <IconCopy size="1rem" />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </div>
            <p className="base64">{logo}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
