"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, resolvedTheme: theme, systemTheme } = useTheme();
  console.log(systemTheme);

  return (
    <div className="flex rounded-3xl overflow-hidden border border-border">
      <Button onClick={() => setTheme("light")} size="icon" className="rounded-3xl dark:bg-transparent hover:bg-primary dark:text-foreground bg-primary hover:text-primary-foreground text-primary-foreground transition-all duration-30000 ease-in-out transform" variant={"ghost"}><Sun className="h-4 w-4" /></Button>
      <Button onClick={() => setTheme("dark")} size="icon" className="rounded-3xl dark:bg-primary dark:text-primary-foreground transition-all duration-3000 ease-in-out transform" variant={"ghost"}><Moon className="h-4 w-4" /></Button>
    </div>
  )
}
