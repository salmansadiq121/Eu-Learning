import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useTheme } from "next-themes";
type Props = {
  value: any;
  open: any;
  shadow: any;
};

const CircularProgressWithLabels = ({ value, open, shadow }: Props) => {
  const { theme } = useTheme();
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={value}
        style={
          shadow
            ? {
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                borderRadius: "50%",
              }
            : {}
        }
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
          style={{ color: theme === "dark" ? "white" : "black" }}
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabels;
