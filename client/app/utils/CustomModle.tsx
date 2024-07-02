import { Modal, Box } from "@mui/material";
import React, { FC } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
  refetch?: any;
};

const CustomModle: FC<Props> = ({
  open,
  setOpen,
  activeItem,
  component: Component,
  setRoute,
  refetch,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 sm:w-[450px] w-[96%] bg-white dark:bg-slate-900 rounded-md shadow-md hover:shadow-lg p-4 outline-none">
        <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
      </Box>
    </Modal>
  );
};

export default CustomModle;
