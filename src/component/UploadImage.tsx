import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState, useEffect } from "react";

interface IUploadImageProps {
  file: File;
}

const UploadImage = (props: IUploadImageProps) => {
  const [logo, setLogo] = useState("");

  const handleUploadFile = (file: File) => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const base64String = fileReader.result as string;
      if (base64String !== null) {
        setLogo(base64String);
      }
    };
  };

  useEffect(() => {
    handleUploadFile(props.file);
  }, []);

  return (
    <div className="uploadImage">
      <div className="copyButton">
        <p>{props.file.name.split(".")[0]}</p>
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
                {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </div>
      <div
        className="logo"
        style={{
          backgroundImage: `url(${logo}`,
        }}
      />
    </div>
  );
};

export default UploadImage;
