import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { AppContext } from "src/contexts/app.context";
import Login from "src/pages/Auth/Login";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
  background: "linear-gradient(70deg,#4A55A2, #7895CB, #A0BFE0, #C5DFF8)",
};

export default function TransitionsModal() {
  const { openModal, setOpenModal } = React.useContext(AppContext);
  const handleClose = () => setOpenModal(false);

  return (
    <div className="">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <div className="bg-mainColor">
            <Box sx={style}>{<Login />}</Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

