"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          "--normal-bg": "#181818",
          "--normal-text": "#ffffff",
          "--normal-border": "#303030"
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
