import { Skeleton } from '@/components/ui/skeleton';

export function UserListSkeleton() {
  return (
    <div className='flex items-center space-x-4'>
      <Skeleton className='h-12 w-12 rounded-full' />
      {/* <Skeleton className='h-[125px] w-[250px] rounded-xl' /> */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
      </div>
    </div>
  );
}
