import React from "react";
import { motion } from "framer-motion";

export default function MotionCursor({ ...props }) {
  const variants = {
    start: {
      "&::before": {
        x: 0,
      },
    },
    end: {
      "&::before": {
        x: 0,
      },
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="start"
      animate="end"
      transition={{ duration: 0.15 }}
      sx={{
        color: "grey",
        position: "relative",
        width: "max-content",
        "&::before": {
          content: "",
          "border-left": "2px solid",
          "border-color": "grey",
          "white-space": "nowrap",
          overflow: "hidden",
          position: "absolute",
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
