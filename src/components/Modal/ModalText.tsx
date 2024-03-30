import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { CloseCircleOutlined } from "@ant-design/icons";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  color: "black",
  borderRadius: "20px",
};

interface ModalTextProps {
  children: React.ReactNode;
  setEnable?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

export default function TransitionsModalText({
  children,
  setEnable,
  title,
}: ModalTextProps) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const handleGetValue = () => {
    // handleClose()
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setEnable && setEnable(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              color={"black"}
              sx={{
                marginBottom: 1,
                fontWeight: 600,
              }}
              className="text-black"
            >
              {title || "Chỉnh sửa"}
            </Typography>
            <div className="max-h-96 w-full overflow-auto">{children}</div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

