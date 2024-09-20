import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AvatarDemo({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={src ? src : 'https://github.com/shadcn.png'}
        alt='@shadcn'
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
