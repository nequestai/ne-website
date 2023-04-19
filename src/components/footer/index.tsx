import Button from '@/components/button';

const Footer = () => (
  <footer className="bg-white border-t border-gray-400 pt-14 pb-16">
    <div
      className="mx-auto text-gray-400 px-8 lg:px-0 flex flex-col items-center justify-center"
      style={{
        gap: `1.5rem`,
      }}
    >
      <div
        className="items-center"
        style={{
          width: `256px`,
        }}
      >
        <img className="w-full" src="logo.svg" alt="logo" />
      </div>
      <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
        <div className="border border-gray-400 rounded py-5 px-4">
          <h4 className="font-mono text-sm uppercase text-gray-500 mb-3">Subscribe to our product updates</h4>
          <div className="flex w-full">
            <input
              aria-label="email address"
              type="text"
              className="border border-gray-300 bg-gray-100 w-full rounded text-gray-800 py-2 px-3 mr-2"
              placeholder="Enter your email"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
    <div className="text-center py-2">
      © {new Date().getFullYear()} NEquest Sciences Inc. Work illustrations by{` `}
      <a href="https://storyset.com/work">Storyset</a>
    </div>
  </footer>
);

export default Footer;
