import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

type SubmitProps = {
  isValidURL: boolean;
};

export function Submit({ isValidURL }: SubmitProps): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      className={`custom-button clickable transition-colors duration-200 ${
        isValidURL ? 'hover:bg-accent-main' : ''
      }`}
      disabled={!isValidURL}
      loading={pending}
    >
      Shorten Url
    </Button>
  );
}