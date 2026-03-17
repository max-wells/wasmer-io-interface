"use client";

import { useState, useEffect } from "react";

const GRAPHQL_ENDPOINT = "https://registry.wasmer.io/graphql";

const QUERY = `
  query GetUserPackages($username: String!) {
    getUser(username: $username) {
      packages(first: 20) {
        edges {
          node {
            name
            namespace
            displayName
            icon
            lastVersion { version description }
          }
        }
      }
    }
  }
`;

export type WasmerPackage = {
  name: string; // "maxime15848/wasmer-io-interface"
  namespace: string; // "maxime15848"
  displayName: string;
  icon: string;
  lastVersion: { version: string; description: string } | null;
};

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; packages: WasmerPackage[] };

export function useWasmerPackages(username: string): State {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
    })
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        const edges = json?.data?.getUser?.packages?.edges ?? [];
        const packages: WasmerPackage[] = edges.map(
          (e: { node: WasmerPackage }) => e.node,
        );
        setState({ status: "success", packages });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ status: "error", message: String(err) });
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
