import { clsx } from 'clsx';
import { Loading } from './loading';
import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  loading?: boolean;
  variant?: 'default' | 'secondary'; 
};

export function Button({
  className,
  loading,
  disabled,
  variant = 'default', 
  children,
  ...rest
}: ButtonProps): JSX.Element {
  const isDisabled = loading ?? disabled;

  return (
    <button
      className={clsx(
        'smooth-tab',
        variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-200 text-black hover:bg-gray-300',
        loading && 'relative !text-transparent brightness-75 disabled:cursor-wait',
        className
      )}
      type='button'
      disabled={isDisabled}
      {...rest}
    >
      {loading && (
        <Loading
          iconClassName='h-5 w-5'
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      )}
      {children}
    </button>
  );
}
