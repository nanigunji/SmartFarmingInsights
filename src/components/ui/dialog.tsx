import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "/Users/shaazhussain/Downloads/mini-project-1/src/lib/utils.ts";

export function Dialog({ children }: { children: React.ReactNode }) {
  return <DialogPrimitive.Root>{children}</DialogPrimitive.Root>;
}

export function DialogTrigger({ children }: { children: React.ReactNode }) {
  return <DialogPrimitive.Trigger className="text-blue-600">{children}</DialogPrimitive.Trigger>;
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
        )}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 text-lg font-semibold">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <DialogPrimitive.Title className="text-xl font-bold">{children}</DialogPrimitive.Title>;
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
  return <DialogPrimitive.Description className="text-gray-600">{children}</DialogPrimitive.Description>;
}
