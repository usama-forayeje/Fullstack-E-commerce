import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function AlertDialog({ ...props }) {
  return <AlertDialogPrimitive.Root {...props} />;
}

function AlertDialogTrigger({ ...props }) {
  return <AlertDialogPrimitive.Trigger {...props} />;
}

function AlertDialogPortal({ className, ...props }) {
  return <AlertDialogPrimitive.Portal className={className} {...props} />;
}

function AlertDialogOverlay({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({ className, ...props }) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className={cn(
          "fixed z-50 top-1/2 left-1/2 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
          "rounded-2xl border border-border bg-popover p-6 shadow-xl",
          "transition-all duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2 text-left", className)} {...props} />;
}

function AlertDialogFooter({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4", className)}
      {...props}
    />
  );
}

function AlertDialogTitle({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Title
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Description
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}

function AlertDialogAction({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants({ variant: "destructive" }), className)}
      {...props}
    />
  );
}

function AlertDialogCancel({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
