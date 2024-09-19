import { Fragment } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CardComponent({ className }: { className: string }) {
  return (
    <Fragment>
      <div className=' h-full'>
        <Card className={className}>
          <CardHeader>
            <CardTitle>Zen Chat</CardTitle>
            <CardDescription>A faster way to message</CardDescription>
          </CardHeader>
          <CardContent className=''>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </Fragment>
  );
}
