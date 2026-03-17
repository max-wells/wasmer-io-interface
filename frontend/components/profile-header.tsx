"use client";

import { UserRound, Check, Copy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GRAVATAR, USER_ID } from "@/lib/data";
import { cn } from "@/lib/utils";
import { NEW_FEATURE_CLS } from "@/lib/new-feature";

type ProfileHeaderProps = {
  copied: boolean;
  onCopy: () => void;
};

export function ProfileHeader({ copied, onCopy }: ProfileHeaderProps) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex items-center gap-4">
        <div className={cn(NEW_FEATURE_CLS, "rounded-xl p-1")}>
          <Avatar className="size-16">
            <AvatarImage src={GRAVATAR} alt="maxime15848" />
            <AvatarFallback className="bg-muted">
              <UserRound className="size-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">
            Maxime{" "}
            <span className="font-normal text-muted-foreground">(maxime15848)</span>
          </h1>
          <button
            type="button"
            onClick={onCopy}
            className={cn(NEW_FEATURE_CLS, "group flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors")}
            title="Click to copy"
          >
            {USER_ID}
            {copied ? (
              <Check className="size-3 text-green-500" />
            ) : (
              <Copy className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
