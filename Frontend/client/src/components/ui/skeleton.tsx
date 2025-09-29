import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/50", className)}
      {...props}
    />
  )
}

// Project card skeleton
function ProjectCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted/20 to-muted/10 p-6 backdrop-blur-sm border border-muted/30">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  )
}

// Service card skeleton
function ServiceCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted/20 to-muted/10 p-8 backdrop-blur-sm border border-muted/30">
      <div className="flex items-center mb-6">
        <Skeleton className="h-12 w-12 rounded-xl mr-4" />
        <Skeleton className="h-6 w-40" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  )
}

// Team member skeleton
function TeamMemberSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted/20 to-muted/10 p-6 backdrop-blur-sm border border-muted/30">
      <div className="flex items-center mb-4">
        <Skeleton className="h-16 w-16 rounded-full mr-4" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-5/6 mb-4" />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  )
}

// Stats skeleton
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="text-center">
          <Skeleton className="h-8 w-16 mx-auto mb-2" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      ))}
    </div>
  )
}

// Content skeleton
function ContentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  )
}

export {
  Skeleton,
  ProjectCardSkeleton,
  ServiceCardSkeleton,
  TeamMemberSkeleton,
  StatsSkeleton,
  ContentSkeleton,
}