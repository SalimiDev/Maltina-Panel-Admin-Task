"use client";

import React, { Fragment, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close dialog when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close dialog when pressing Escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full mx-4",
  };

  return (
    <Fragment>
      {/* Backdrop with click handler and animation */}
      <div
        className="z-index-overlay fixed inset-0 "
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="z-index-modal bg-black/30 fixed inset-0 flex items-center justify-center overflow-y-auto p-4 transition-opacity duration-300">
        <div
          ref={dialogRef}
          className={cn(
            "relative w-full scale-100 rounded-lg bg-surface-background p-6 shadow-xl transition-all duration-300",
            sizeClasses[size],
          )}
        >
          {/* Header */}
          {title && (
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          )}

          {/* Content */}
          <div className={cn(!title && "pt-2")}>{children}</div>
        </div>
      </div>
    </Fragment>
  );
}
