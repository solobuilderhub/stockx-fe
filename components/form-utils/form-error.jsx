import { AlertTriangleIcon } from "lucide-react";

export const FormError = ({ message }) => {
  if (!message) return null;
  return (
    <div
      className="bg-destructive/15 p-3 rounded-md flex
            items-center gap-x-2 text-destructive text-sm"
    >
      <AlertTriangleIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
