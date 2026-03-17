"use client";

import { Search, Bell, UserRound, ChevronsUpDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GRAVATAR, TAB_LABELS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { NEW_FEATURE_CLS } from "@/lib/new-feature";

export function WasmerLogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 29 34" fill="none" className={className} aria-label="Wasmer">
      <path
        d="M0 12.3582C0 10.4725 0 9.52973 0.507307 9.23683C1.01461 8.94394 1.83111 9.41534 3.46411 10.3581L10.784 14.5843C12.417 15.5271 13.2335 15.9985 13.7408 16.8771C14.2481 17.7558 14.2481 18.6986 14.2481 20.5843V29.0364C14.2481 30.9221 14.2481 31.8649 13.7408 32.1578C13.2335 32.4507 12.417 31.9793 10.784 31.0365L3.4641 26.8103C1.83111 25.8675 1.01461 25.3961 0.507307 24.5175C0 23.6388 0 22.696 0 20.8103V12.3582Z"
        fill="#0F0518"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.46147 5.14203C6.95416 5.43492 6.95416 6.37773 6.95416 8.26335V9.18177L13.9688 13.2317C15.6018 14.1745 16.4183 14.6459 16.9256 15.5246C17.433 16.4032 17.433 17.346 17.433 19.2317V26.7654L17.7382 26.9416C19.3711 27.8845 20.1876 28.3559 20.695 28.063C21.2023 27.7701 21.2023 26.8273 21.2023 24.9416V16.4894C21.2023 14.6038 21.2023 13.661 20.695 12.7823C20.1876 11.9037 19.3711 11.4323 17.7382 10.4895L10.4183 6.26334C8.78527 5.32054 7.96878 4.84914 7.46147 5.14203Z"
        fill="#0F0518"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5533 1.05023C14.046 1.34313 14.046 2.28594 14.046 4.17156V5.09003L21.0607 9.13993C22.6937 10.0827 23.5102 10.5541 24.0175 11.4328C24.5248 12.3115 24.5248 13.2543 24.5248 15.1399V22.6736L24.83 22.8499C26.463 23.7927 27.2795 24.2641 27.7868 23.9712C28.2941 23.6783 28.2941 22.7355 28.2941 20.8498V12.3976C28.2941 10.512 28.2941 9.56922 27.7868 8.69054C27.2795 7.81187 26.463 7.34046 24.83 6.39766L17.5101 2.17155C15.8771 1.22874 15.0606 0.757338 14.5533 1.05023Z"
        fill="#0F0518"
      />
    </svg>
  );
}

type NavbarProps = {
  currentTab: string;
  onSearchClick: () => void;
};

export function Navbar({ currentTab, onSearchClick }: NavbarProps) {
  const tabLabel = currentTab !== "overview" ? TAB_LABELS[currentTab] : null;
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="sticky top-0 z-50 bg-muted/60 px-4 py-2 backdrop-blur-sm">
      <header className="mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-xl border border-border bg-card px-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium">
          <WasmerLogoIcon className="size-7" />
          <span className="text-muted-foreground">/</span>
          <Avatar className="size-6">
            <AvatarImage src={GRAVATAR} alt="maxime15848" />
            <AvatarFallback className="bg-muted">
              <UserRound className="size-3.5 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <span>maxime15848</span>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
          {tabLabel && (
            <>
              <span className="text-muted-foreground">/</span>
              <span>{tabLabel}</span>
            </>
          )}
        </div>

        {/* Demo badge */}
        <span className="ml-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-950 tracking-wide shadow-sm">
          ✦ Interview Project · Demo
        </span>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onSearchClick}
            className={cn(NEW_FEATURE_CLS, "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors")}
          >
            <Search className="size-3.5" />
            <span>Search</span>
            <kbd className="ml-1 hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:inline">
              ⌘K
            </kbd>
          </button>
          <Button variant="outline" size="sm">
            Create app
          </Button>
          <Button variant="ghost" size="icon-sm">
            <Bell className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle dark mode"
            className={cn(NEW_FEATURE_CLS, "rounded-lg")}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
          <Avatar className="size-7 cursor-pointer">
            <AvatarImage src={GRAVATAR} alt="maxime15848" />
            <AvatarFallback className="bg-foreground">
              <UserRound className="size-4 text-background" />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
    </div>
  );
}
