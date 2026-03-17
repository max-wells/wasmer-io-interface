"use client";

import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWasmerPackages, type WasmerPackage } from "@/hooks/use-wasmer-packages";

// ─── Package Card ─────────────────────────────────────────────────────────────

type PackageCardProps = {
  pkg: WasmerPackage;
};

function PackageCard({ pkg }: PackageCardProps) {
  const shortName = pkg.name.split("/")[1] ?? pkg.name;
  const initial = shortName[0]?.toUpperCase() ?? "?";

  return (
    <Card className="transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
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
        </div>
        {pkg.lastVersion?.description && (
          <p className="mt-3 text-sm text-muted-foreground">
            {pkg.lastVersion.description}
          </p>
        )}
        {pkg.lastVersion?.version && (
          <p className="mt-2 text-xs text-muted-foreground">v{pkg.lastVersion.version}</p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Packages Tab ─────────────────────────────────────────────────────────────

export function PackagesTab() {
  const result = useWasmerPackages("maxime15848");

  return (
    <div className="max-w-lg">
      <div>
        <p className="mb-3 text-sm text-muted-foreground">
          Recently published packages
          {result.status === "success" && (
            <span className="ml-2 text-xs text-muted-foreground/60">(live)</span>
          )}
        </p>

        {result.status === "loading" && (
          <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading packages…
          </div>
        )}

        {result.status === "error" && (
          <p className="text-sm text-destructive">Failed to load packages.</p>
        )}

        {result.status === "success" && (
          <div className="flex flex-col gap-3">
            {result.packages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
