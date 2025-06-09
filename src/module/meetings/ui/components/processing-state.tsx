import { EmptyState } from "@/components/empty-state";

export function ProcessingState() {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting Completed"
        description="The meeting was completed, a summary will appear soon"
      />
    </div>
  );
}
