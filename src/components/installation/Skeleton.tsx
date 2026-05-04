import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonCard= ()=>{
  return (
    <div className="flex  items-center justify-between flex-col gap-5 pt-10">
         <Skeleton className="md:h-8 md:w-[650px] h-4 w-[250px]" />
        <Skeleton className="md:h-8 md:w-[600px] h-4 w-[250px]" />
      <div className="space-y-2">
      <Skeleton className="md:h-[425px] md:w-[650px] h-[125px] w-[250px] rounded-xl" />
       
      </div>
    </div>
  )
}
