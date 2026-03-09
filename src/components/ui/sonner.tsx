"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      toastOptions={{
        ...props.toastOptions,
        unstyled: false,
        classNames: {
          toast: 'group-[.toaster]:pr-4',
          content: 'group-[.toaster]:flex group-[.toaster]:flex-col',
        },
        style: {
          animationDuration: '400ms',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
