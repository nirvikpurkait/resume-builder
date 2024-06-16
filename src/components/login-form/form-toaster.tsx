import { cn } from "@/lib/shadcn-ui/utils";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import toast, { Toast } from "react-hot-toast";
import ToastClosingButton from "./toast-closing-button";

export default function FormToaster({
  id,
  toastMessage,
  type,
}: Omit<Toast, "type"> & { toastMessage?: string; type: "success" | "error" }) {
  const dismissToast = () => {
    toast.dismiss(id);
  };

  return (
    <div
      className={cn(
        `flex w-full max-w-md rounded-md border bg-white py-2 text-gray-900 dark:bg-gray-900 dark:text-white`,
        {
          "border-green-500": type === "success",
          "border-red-500": type === "error",
        }
      )}
    >
      <div
        className={cn(
          `flex w-full items-center gap-4 border-r border-gray-500 px-4`
        )}
      >
        {type === "success" && (
          <FontAwesomeIcon
            className={cn(
              `aspect-square w-4 rounded-full bg-green-500 p-0.5 text-white`
            )}
            icon={faCheck}
          />
        )}
        {type === "error" && (
          <FontAwesomeIcon
            className={cn(
              `aspect-square w-4 rounded-full bg-red-500 p-0.5 text-white`
            )}
            icon={faXmark}
          />
        )}
        {toastMessage}
      </div>
      <ToastClosingButton onClick={dismissToast} />
    </div>
  );
}
