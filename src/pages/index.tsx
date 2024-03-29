import { NextSeo } from 'next-seo';
import Page from '@/components/page';
import Header from '@/components/header';
import ListSection from '@/components/list-section';
import AboutUs from '@/components/about-us';
import ContactUs from '@/components/contact-us';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <Page>
      <NextSeo
        title="NEquest - Neurocare for everyone."
        description="NEquest is building the next generation of assistive tools for neurologists."
      />
      <Header />
      <main>
        <ListSection />
        <AboutUs />
        <ContactUs />
      </main>
      <Footer />
    </Page>
  );
}
