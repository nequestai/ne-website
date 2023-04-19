import Button from '@/components/button';
import { useRouter } from 'next/dist/client/router';

import styles from './header.module.css';

const Header = () => {
  const router = useRouter();

  return (
    <header
      style={{
        backgroundColor: `#ffffff`,
        minHeight: `calc(100vh - 6rem)`,
      }}
      className="flex items-center"
    >
      <div className="max-w-4xl mx-auto px-12 sm:px-6 lg:px-8">
        <h1 className="font-sans font-bold text-5xl lg:text-8xl text-center leading-snug text-gray-800">
          Neurocare for{` `}
          <span className={styles[`highlight-container`]}>
            <span className={`${styles.highlight} text-white`}>everyone</span>
          </span>
        </h1>
        <div className="max-w-xl mx-auto">
          <p className="mt-10 text-gray-500 text-center text-xl lg:text-3xl">
            We are building the next generation of assistive tools for neurologists.
          </p>
        </div>
        <div className="mt-10 flex flex-row sm:flex-row gap-2 justify-center items-center w-full mx-auto">
          <Button modifier="sm:mr-4" primary onClick={() => router.push(`/#about`)}>
            Learn More
          </Button>
          <Button onClick={() => router.push(`/#contact`)}>Contact us</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
