"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function AgentsView() {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export function AgentsViewLoading() {
  return (
    <LoadingState
      title="Agents Loading"
      description="This may take a few seconds"
    />
  );
}

export function AgentsViewError() {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Something went wrong"
    />
  );
}
