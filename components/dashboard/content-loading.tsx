import { Skeleton } from "@/components/ui/skeleton";

export default function ContentLoading() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-[200px]" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-24 w-full rounded-md" />
        <Skeleton className="h-24 w-full rounded-md" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>
    </section>
  );
}
