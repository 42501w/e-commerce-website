'use client'

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed min-h-screen w-full bg-white left-0 top-0 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-1">
        <h1 className="text-xl font-bold">TimberCraft</h1>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{repeat:Infinity, duration:1.5}}
          className="flex items-center space-x-2 text-green-800"
        >
          <Loader2 className="animate-spin" />
          <span className="font-semibold tracking-wide">
            TimberCraft is loading...
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
