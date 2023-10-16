import React, { useEffect, useRef } from 'react';
import { useScrollPosition } from 'react-use-scroll-position';

import { Toast } from 'primereact/toast';

import Button from '@/components/button';

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const [showLogo, setShowLogo] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [subscribeEmail, setSubscribeEmail] = React.useState(``);
  const toast = React.useRef<Toast>(null);
  const { y } = useScrollPosition();

  useEffect(() => {
    if (ref.current && y > ref.current.offsetTop - 500) {
      setShowLogo(true);
    } else {
      setShowLogo(false);
    }
  }, [y]);

  return (
    <footer className="bg-white border-t border-gray-400 pt-14 pb-16" ref={ref}>
      <div
        className="mx-auto text-gray-400 px-8 lg:px-0 flex flex-col items-center justify-center"
        style={{
          gap: `1.5rem`,
        }}
      >
        <Toast ref={toast} position="bottom-right" />
        <div
          className={`items-center ${showLogo ? `opacity-100` : `opacity-0`} transition-all duration-1000 ease-in-out`}
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
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                style={{
                  borderColor: error ? `#ff0000` : `#d1d5db`,
                }}
              />
              <Button
                onClick={() => {
                  const validateEmail = (email: string) =>
                    String(email)
                      .toLowerCase()
                      .match(
                        // eslint-disable-next-line max-len
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      );
                  const valid = validateEmail(subscribeEmail);
                  if (valid) {
                    toast.current?.show({
                      severity: `info`,
                      summary: `Thank you`,
                      detail: `${subscribeEmail}, you're subscribed!`,
                    });
                    setSubscribeEmail(``);
                    setError(false);
                  } else {
                    setError(true);
                  }
                }}
              >
                Subscribe
              </Button>
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
};

export default Footer;
