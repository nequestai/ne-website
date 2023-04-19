import Head from 'next/head';
import Navigation from '@/components/navigation';

interface IProps {
  children: React.ReactNode;
}

const Page = ({ children }: IProps) => (
  <div>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8">
      <Navigation />
      {children}
    </div>
  </div>
);

export default Page;
