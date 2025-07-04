import Image from 'next/image';
import Link from 'next/link';
import { FiGithub } from 'react-icons/fi';

export function Header(): JSX.Element {
  return (
    <header className='my-4 flex items-center justify-between shadow-lg'>
      <div className='flex items-center gap-2'>
        <Link href='/'>
          <Image src='/logo.svg' width={24} height={24} alt='Logo' />
        </Link>
        <div>
          <h1 className='font-bold text-accent-main'>Link</h1>
          <p className='-mt-1 text-sm text-gray-200'>
            at{' '}
            <a
              className='animated-underline'
              href='https://mamskie.me'
              target='_blank'
            >
              mamskie.me
            </a>
          </p>
        </div>
      </div>
      <div>
        <a
          className='smooth-tab grid text-2xl'
          href='https://github.com/mamskie'
          target='_blank'
        >
          <FiGithub />
        </a>
      </div>
    </header>
  );
}
