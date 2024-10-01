'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@radix-ui/react-label';
import { Fragment, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export const ForgotDialog = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Fragment>
      <Dialog>
        <DialogTrigger className='font-medium hover:underline'>
          Forgot Password
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Forgot Password?</DialogTitle>
          </DialogHeader>
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Label
                htmlFor='link'
                className='sr-only'
              >
                Link
              </Label>
              <Input
                id='link'
                placeholder='Enter your email'
              />
              <Button disabled={loading}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
