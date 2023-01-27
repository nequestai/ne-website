import Button from '@/components/button';

const Footer = () => (
  <footer className="bg-white border-t border-gray-400 pt-14 pb-16">
    <div className="max-w-7xl mx-auto text-gray-400 px-8 lg:px-0 flex flex-wrap">
      <div className="mb-14 flex items-center w-full">
        <img className="h-12 w-12 mr-4" src="logo.svg" alt="logo" width={48} height={48} />
        <p className="text-4xl text-indigo-500 font-bold">NEquest</p>
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
  </footer>
);

export default Footer;
