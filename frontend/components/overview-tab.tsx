"use client";

import { useState } from "react";
import {
  UserRound,
  Upload,
  FolderOpen,
  CircleDot,
  Heart,
  Loader2,
  EyeOff,
  Eye,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { frameworks } from "@/lib/data";
import { useRelativeTime, DEPLOY_TIME, JOIN_TIME } from "@/hooks/use-relative-time";
import { useWasmerPackages, type WasmerPackage } from "@/hooks/use-wasmer-packages";

// ─── Activity ─────────────────────────────────────────────────────────────────

function ActivityOverview() {
  const deployedAt = useRelativeTime(DEPLOY_TIME);
  const joinedAt = useRelativeTime(JOIN_TIME);

  const items = [
    { action: "published a new app", detail: "wasmer-io-interface", time: deployedAt },
    { action: "joined Wasmer", detail: null, time: joinedAt },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Activity</p>
      <div className="flex flex-col gap-2">
        {items.map(({ action, detail, time }) => (
          <Card key={action} className="bg-transparent px-4 py-3 shadow-none">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-muted">
                    <UserRound className="size-4 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-foreground ring-2 ring-background">
                  <Upload className="size-2.5 text-background" />
                </span>
              </div>
              <div className="text-[13px] leading-snug">
                <p>
                  <span className="font-semibold">maxime15848</span>{" "}
                  <span className="text-muted-foreground">{action}</span>
                  {detail && (
                    <>
                      {" "}
                      <span className="font-medium text-indigo-600">{detail}</span>
                    </>
                  )}
                </p>
                <p className="mt-0.5 text-muted-foreground">{time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Compact Cards ────────────────────────────────────────────────────────────

function CliIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 22 22"
      className="shrink-0"
    >
      <g clipPath="url(#cli-clip)">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.375"
          d="m6.365 7 3.486 3.486-3.486 3.486m5.807-.302h3.713"
        />
        <rect
          width="20.5"
          height="20.5"
          x=".75"
          y=".75"
          stroke="currentColor"
          strokeOpacity=".2"
          strokeWidth="1.5"
          rx="4.125"
        />
      </g>
      <defs>
        <clipPath id="cli-clip">
          <rect width="22" height="22" fill="white" rx="4.125" />
        </clipPath>
      </defs>
    </svg>
  );
}

function AppCard() {
  return (
    <Card className="flex flex-col overflow-hidden p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Screenshot */}
      <div className="relative aspect-[1.6] w-full overflow-hidden rounded-md border">
        <img
          src="https://api.microlink.io/?url=https%3A%2F%2Fwasmer-io-interface.wasmer.app&screenshot=true&meta=false&embed=screenshot.url"
          alt="wasmer-io-interface preview"
          className="h-full w-full object-cover object-top"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 pt-4">
        {/* App name row */}
        <div className="flex items-center gap-2 text-sm">
          {/* biome-ignore lint/performance/noImgElement: favicon service */}
          <img
            src="https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=wasmer-io-interface.wasmer.app&size=64"
            alt="favicon"
            width={16}
            height={16}
            className="size-4 rounded-sm"
          />
          <span className="font-semibold">wasmer-io-interface</span>
          <hr className="h-px flex-1 bg-border" />
          <a
            href="https://wasmer-io-interface.wasmer.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline truncate max-w-[130px]"
          >
            wasmer-io-interface.wasmer.app
          </a>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">maxime15848</span>
            deployed via
            <CliIcon />
            <span>wasmer cli</span>
          </div>
          <span className="size-2.5 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.4)]" />
        </div>
      </div>
    </Card>
  );
}

function PackageCard({ pkg }: { pkg: WasmerPackage }) {
  const shortName = pkg.name.split("/")[1] ?? pkg.name;
  const initial = shortName[0]?.toUpperCase() ?? "?";
  return (
    <Card className="transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {pkg.icon ? (
            // biome-ignore lint/performance/noImgElement: CDN image
            <img
              src={pkg.icon}
              alt={shortName}
              width={40}
              height={40}
              className="size-10 rounded-lg object-cover"
            />
          ) : (
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-base">
              {initial}
            </div>
          )}
          <p className="text-sm font-medium">
            <span className="text-muted-foreground">{pkg.namespace}</span>
            {" / "}
            <span className="font-semibold">{shortName}</span>
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0 text-muted-foreground hover:text-red-500"
        >
          <Heart className="size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

export function OverviewTab() {
  const [simulateEmpty, setSimulateEmpty] = useState(false);
  const packagesResult = useWasmerPackages("maxime15848");

  return (
    <div className="space-y-8">
      <h2 className="text-center text-lg font-semibold">
        Welcome to Wasmer. Let&apos;s get started!
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Start from a template */}
        <Card className="flex flex-col items-start gap-6 rounded-xl border px-6 py-8 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="h-35 w-full">
            <div className="group flex w-full flex-row overflow-hidden pt-12 [--duration:30s] [--gap:1rem] gap-(--gap)">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex shrink-0 justify-around gap-(--gap)"
                  style={{ animation: "marquee var(--duration) linear infinite" }}
                  aria-hidden={i > 0}
                >
                  <div className="flex gap-9">
                    {frameworks.map((fw) => (
                      // biome-ignore lint/performance/noImgElement: external SVG
                      <img
                        key={fw.name}
                        src={fw.src}
                        alt={`${fw.name} icon`}
                        width={88}
                        height={88}
                        className="object-contain"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[20px] font-semibold">Start from a template</p>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            <li>Many frameworks available</li>
            <li>Super easy to setup</li>
            <li>Deploy automatically on new changes</li>
          </ul>
          <div className="mt-auto flex w-full flex-col gap-6 pt-8">
            <Button className="w-full">Browse templates</Button>
          </div>
        </Card>

        {/* Import Application */}
        <Card className="flex flex-col items-start gap-6 rounded-xl border px-6 py-8 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex h-35 w-full items-center justify-center">
            {/* biome-ignore lint/performance/noImgElement: external SVG */}
            <img
              src="https://wasmer.io/icons/github-wasmer.svg"
              alt="GitHub to Wasmer"
              width={240}
              height={66}
              className="object-contain"
            />
          </div>
          <p className="text-[20px] font-semibold">Import Application</p>
          <ul className="list-inside list-disc text-sm text-muted-foreground">
            <li>Import your repository</li>
            <li>Deploy manually or automatically on each change</li>
            <li>Choose your preferred framework</li>
          </ul>
          <div className="mt-auto flex w-full flex-col gap-6 pt-8">
            <Button variant="outline" className="w-full">
              Deploy using the Wasmer CLI
            </Button>
            <Button className="w-full">Import from Github</Button>
          </div>
        </Card>
      </div>

      {/* Bottom section header with empty state toggle */}
      <div className="flex items-center justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs text-muted-foreground"
          onClick={() => setSimulateEmpty((v) => !v)}
        >
          {simulateEmpty ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
          {simulateEmpty ? "Show data" : "Simulate empty state (demo)"}
        </Button>
      </div>

      {/* Bottom 3-column section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ActivityOverview />

        {/* Recently deployed apps */}
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Recently deployed apps
            <span className="ml-2 text-xs text-muted-foreground/60">(hardcoded)</span>
          </p>
          {simulateEmpty ? (
            <Card className="flex-1">
              <CardContent className="flex h-full flex-col items-center justify-center gap-2 py-10">
                <FolderOpen
                  className="size-10 text-muted-foreground/40"
                  strokeWidth={1}
                />
                <p className="text-sm text-muted-foreground">
                  There are no apps available
                </p>
              </CardContent>
            </Card>
          ) : (
            <AppCard />
          )}
        </div>

        {/* Recently published packages */}
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Recently published packages
            {!simulateEmpty && packagesResult.status === "success" && (
              <span className="ml-2 text-xs text-muted-foreground/60">(live)</span>
            )}
          </p>
          {simulateEmpty ? (
            <Card className="flex-1">
              <CardContent className="flex h-full flex-col items-center justify-center gap-3 py-10">
                <FolderOpen
                  className="size-10 text-muted-foreground/40"
                  strokeWidth={1}
                />
                <p className="text-sm text-muted-foreground">
                  There are no packages available
                </p>
                <Button size="sm">
                  <CircleDot className="size-3.5" />
                  Publish package
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {packagesResult.status === "loading" && (
                <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Loading…
                </div>
              )}
              {packagesResult.status === "error" && (
                <p className="text-sm text-destructive">Failed to load packages.</p>
              )}
              {packagesResult.status === "success" &&
                packagesResult.packages.map((pkg) => (
                  <PackageCard key={pkg.name} pkg={pkg} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
