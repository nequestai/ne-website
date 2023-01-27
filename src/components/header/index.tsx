import { tw, css } from 'twind/css';

import Button from '@/components/button';
import { useRouter } from 'next/dist/client/router';

const headerStyle = css`
  background-color: #ffffff;
  min-height: calc(100vh - 6rem);
`;

const Header = () => {
  const router = useRouter();

  return (
    <header className={tw(headerStyle)}>
      <div className={tw(`max-w-4xl mx-auto py-28 px-16 sm:px-6 lg:px-8`)}>
        <h1 className={tw(`font-sans font-bold text-5xl lg:text-8xl text-center leading-snug text-gray-800`)}>
          Neurocare for everyone
        </h1>
        <div className={tw(`max-w-xl mx-auto`)}>
          <p className={tw(`mt-10 text-gray-500 text-center text-xl lg:text-3xl`)}>
            We are building the next generation of assistive tools for neurologists.
          </p>
        </div>
        <div className={tw(`mt-10 flex justify-center items-center w-full mx-auto`)}>
          <Button primary onClick={() => router.push(`/#about`)}>
            Learn More
          </Button>
          <span className={tw(`mx-2`)}>or</span>
          <Button onClick={() => router.push(`/#contact`)}>Contact us</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
