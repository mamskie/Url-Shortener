export function Footer(): JSX.Element {
  return (
    <footer className='my-4 text-center'>
      <p className='text-gray-300'>&copy; Mamskie {new Date().getFullYear()}</p>
    </footer>
  );
}
