import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toDataURL } from 'qrcode';
import { checkSlugExists } from '@/lib/helper-server';
import { NEXT_PUBLIC_URL } from '@/lib/env';
import { CopyButton } from '@/components/ui/copy-button';
import { Button } from '@/components/ui/button';

export default async function Success({
  params: { slug }
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const decodedSlug = decodeURIComponent(slug);
  const slugExists = await checkSlugExists(decodedSlug);

  if (!slugExists) redirect('/');

  const url = `${NEXT_PUBLIC_URL}/l/${decodedSlug}`;
  const qrCodeDataURL: string = await toDataURL(url);

  return (
    <main className='flex flex-col items-center px-4 pt-6'>
  <section className='w-full max-w-4xl grid gap-6'>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center'>
      
      {/* QR Code & Download */}
      <div className='flex flex-col items-center gap-4'>
        <img src={qrCodeDataURL} alt='QR Code' className='w-40 h-40' />
        <a href={qrCodeDataURL} download={`qrcode-${decodedSlug}.png`}>
          <button className='px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-600 transition'>
            Download QR Code
          </button>
        </a>
      </div>

      {/* Short Link & Copy */}
      <div className='flex flex-col gap-3'>
        <h1 className='text-lg font-semibold'>Your short link has been created successfully:</h1>
        <div className='main-border relative rounded px-3 py-2 bg-gray-100'>
          <a
            className='animated-underline break-all text-black hover:underline'
            href={url}
            target='_blank'
            rel='noopener noreferrer'
          >
            {url}
          </a>
          <CopyButton url={url} />
        </div>
      </div>

    </div>

    {/* Create Another */}
    <div className='flex justify-center pt-4'>
      <Link href='/'>
        <Button className='custom-button clickable'>Create another</Button>
      </Link>
    </div>
  </section>
</main>

  );
}
