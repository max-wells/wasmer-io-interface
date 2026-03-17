"use client";

import { useEffect } from "react";
import { Command } from "cmdk";
import { Dialog } from "radix-ui";
import {
  LayoutGrid,
  LayoutDashboard,
  ChartLine,
  Package,
  Settings,
  Copy,
  Moon,
  Sun,
  ExternalLink,
  Check,
} from "lucide-react";
import { useTheme } from "next-themes";

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTabChange: (tab: string) => void;
  copied: boolean;
  onCopyUserId: () => void;
};

const NAV_ITEMS = [
  { value: "overview", label: "Overview", icon: LayoutGrid },
  { value: "apps", label: "Apps", icon: LayoutDashboard },
  { value: "usage", label: "Usage", icon: ChartLine },
  { value: "packages", label: "Packages", icon: Package },
  { value: "settings", label: "Settings", icon: Settings },
];

export function CommandPalette({
  open,
  onOpenChange,
  onTabChange,
  copied,
  onCopyUserId,
}: CommandPaletteProps) {
  const { resolvedTheme, setTheme } = useTheme();

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const run = (fn: () => void) => {
    fn();
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-[28%] z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <Command className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
            <div className="flex items-center border-b border-border px-3">
              <Command.Input
                placeholder="Type a command or search..."
                className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>

            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigate">
                {NAV_ITEMS.map(({ value, label, icon: Icon }) => (
                  <Command.Item
                    key={value}
                    value={`navigate ${label}`}
                    onSelect={() => run(() => onTabChange(value))}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm aria-selected:bg-muted"
                  >
                    <Icon className="size-4 text-muted-foreground" />
                    <span>Go to {label}</span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Separator className="my-1 h-px bg-border" />

              <Command.Group heading="Account">
                <Command.Item
                  value="copy user id"
                  onSelect={() => run(onCopyUserId)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm aria-selected:bg-muted"
                >
                  {copied ? (
                    <Check className="size-4 text-green-500" />
                  ) : (
                    <Copy className="size-4 text-muted-foreground" />
                  )}
                  <span>Copy User ID</span>
                </Command.Item>
                <Command.Item
                  value="toggle theme dark light mode"
                  onSelect={() =>
                    run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
                  }
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm aria-selected:bg-muted"
                >
                  {resolvedTheme === "dark" ? (
                    <Sun className="size-4 text-muted-foreground" />
                  ) : (
                    <Moon className="size-4 text-muted-foreground" />
                  )}
                  <span>Toggle {resolvedTheme === "dark" ? "Light" : "Dark"} Mode</span>
                </Command.Item>
              </Command.Group>

              <Command.Separator className="my-1 h-px bg-border" />

              <Command.Group heading="Links">
                <Command.Item
                  value="docs documentation wasmer"
                  onSelect={() =>
                    run(() => window.open("https://docs.wasmer.io", "_blank"))
                  }
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm aria-selected:bg-muted"
                >
                  <ExternalLink className="size-4 text-muted-foreground" />
                  <span>Open Docs</span>
                </Command.Item>
                <Command.Item
                  value="github source code"
                  onSelect={() =>
                    run(() => window.open("https://github.com/wasmerio", "_blank"))
                  }
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm aria-selected:bg-muted"
                >
                  <ExternalLink className="size-4 text-muted-foreground" />
                  <span>GitHub</span>
                </Command.Item>
              </Command.Group>
            </Command.List>

            <div className="border-t border-border px-3 py-2 text-xs text-muted-foreground flex gap-3">
              <span>
                <kbd className="font-mono">↑↓</kbd> navigate
              </span>
              <span>
                <kbd className="font-mono">↵</kbd> select
              </span>
              <span>
                <kbd className="font-mono">esc</kbd> close
              </span>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
