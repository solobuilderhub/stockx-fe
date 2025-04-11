// components/ui/GenericDialog.jsx
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  
  const GenericDialog = ({
    open,
    onOpenChange,
    title,
    description,
    children,
    maxWidth = "sm:max-w-[600px]",
  }) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={maxWidth}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  };
  
  export default GenericDialog;
  