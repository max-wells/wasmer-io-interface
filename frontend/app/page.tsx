"use client";

import { useEffect, useState } from "react";
import { Globe, Terminal } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommandPalette } from "@/components/command-palette";
import { Navbar } from "@/components/navbar";
import { OverviewTab } from "@/components/overview-tab";
import { PackagesTab } from "@/components/packages-tab";
import { ProfileHeader } from "@/components/profile-header";
import { USER_ID } from "@/lib/data";

import { LayoutGrid, Package, LayoutDashboard, ChartLine, Settings } from "lucide-react";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  // Using window.location instead of useSearchParams to avoid
  // the Suspense boundary requirement in Next.js static export (output: "export")
  const [currentTab, setCurrentTab] = useState("overview");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { copied, copy: copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab") ?? "overview";
    setCurrentTab(tab);
  }, []);

  const handleTabChange = (val: string) => {
    setCurrentTab(val);
    window.history.pushState({}, "", val === "overview" ? "/" : `?tab=${val}`);
  };

  const handleCopyUserId = () => copyToClipboard(USER_ID);

  return (
    <div className="flex-1 bg-muted/40">
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onTabChange={handleTabChange}
        copied={copied}
        onCopyUserId={handleCopyUserId}
      />
      <Navbar currentTab={currentTab} onSearchClick={() => setPaletteOpen(true)} />
      <ProfileHeader copied={copied} onCopy={handleCopyUserId} />

      <div className="mx-auto max-w-6xl px-6 pb-12">
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList className="mb-0 w-full">
            <TabsTrigger value="overview">
              <LayoutGrid className="size-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="apps">
              <LayoutDashboard className="size-4" />
              Apps
            </TabsTrigger>
            <TabsTrigger value="usage">
              <ChartLine className="size-4" />
              Usage
            </TabsTrigger>
            <TabsTrigger value="packages">
              <Package className="size-4" />
              Packages
            </TabsTrigger>
            <TabsTrigger value="settings" className="ml-auto">
              <Settings className="size-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="apps">
            <Card className="w-full overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full shrink-0 overflow-hidden border-b border-border bg-muted md:w-72 md:border-b-0 md:border-r">
                  <img
                    src="https://api.microlink.io/?url=https%3A%2F%2Fwasmer-io-interface.wasmer.app&screenshot=true&meta=false&embed=screenshot.url"
                    alt="wasmer-io-interface preview"
                    className="h-48 w-full object-cover object-top md:h-full"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Globe className="size-4 text-muted-foreground" />
                    <span>wasmer-io-interface</span>
                    <span className="text-border">|</span>
                    <a
                      href="https://wasmer-io-interface.wasmer.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      wasmer-io-interface.wasmer.app
                    </a>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-3 text-sm">
                    <span>
                      <span className="font-semibold">maxime15848</span>
                      {" deployed via "}
                      <span className="inline-flex items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-xs">
                        <Terminal className="size-3" />
                        wasmer cli
                      </span>
                    </span>
                    <span className="size-2.5 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.4)]" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="usage">
            <p className="text-sm text-muted-foreground">Usage stats go here.</p>
          </TabsContent>

          <TabsContent value="packages">
            <PackagesTab />
          </TabsContent>

          <TabsContent value="settings">
            <p className="text-sm text-muted-foreground">Settings go here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
