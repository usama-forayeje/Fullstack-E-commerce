import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `w-full min-h-16 rounded-md px-3 py-2 text-white text-base md:text-sm
         bg-gray-800 border border-gray-600 placeholder:text-gray-400 shadow-sm
         transition duration-300 ease-in-out outline-none resize-none
         focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
         hover:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50`,
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
