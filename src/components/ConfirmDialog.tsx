"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";

type DialogType = "info" | "success" | "warning" | "danger";

interface ConfirmDialogProps {
  title?: string;
  message: string;
  type?: DialogType;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  trigger?: (openDialog: () => void) => ReactNode;
  open?: boolean;
  onCancel?: () => void;
}

const iconMap = {
  info: <Info className="text-red-500" size={40} />,
  success: <CheckCircle2 className="text-green-500" size={40} />,
  warning: <AlertCircle className="text-yellow-500" size={40} />,
  danger: <XCircle className="text-red-500" size={40} />,
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  type = "info",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  trigger,
  open,
  onCancel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const show = open !== undefined ? open : isOpen;
  const close = () => {
    if (onCancel) onCancel();
    if (open === undefined) setIsOpen(false);
  };
  const openDialog = () => {
    if (open === undefined) setIsOpen(true);
  };

  return (
    <>
      {trigger && trigger(openDialog)}

      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-6 w-[350px] max-w-[90%] text-center dark:bg-zinc-800"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex flex-col items-center space-y-4">
                <div>{iconMap[type]}</div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {title}
                </h2>
                <p className="text-sm">{message}</p>
                <div className="flex justify-center gap-3 mt-4 w-full">
                  {/* Hide cancel button when type is "success" */}
                  {type !== "success" && type !== "danger" && (
                    <button
                      onClick={close}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    >
                      {cancelText}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onConfirm();
                      close();
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg text-white transition ${type === "danger"
                      ? "bg-red-600 hover:bg-red-700"
                      : type === "success"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-500 hover:bg-red-600"
                      }`}
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConfirmDialog;
