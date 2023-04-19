import { useState } from 'react';

interface IMenuButton {
  toggleMenu: React.MouseEventHandler<HTMLButtonElement>;
  showMenu: boolean;
}

type Link = {
  label: string;
  href: string;
};

const links = [
  {
    label: `About`,
    href: `/#about`,
  },
  {
    label: `Team`,
    href: `/#team`,
  },
  {
    label: `Contact Us`,
    href: `/#contact`,
  },
];

const MenuButton = ({ toggleMenu, showMenu }: IMenuButton) => (
  <button
    type="button"
    aria-controls="mobile-menu"
    aria-expanded={showMenu}
    onClick={toggleMenu}
    className="p-2 text-gray-400"
  >
    <span className="sr-only">Open menu</span>
    {showMenu ? (
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        width={24}
        height={24}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        width={24}
        height={24}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )}
  </button>
);

const MobileMenu = ({ toggleMenu }: any) => (
  <div className="md:hidden absolute">
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {links.map((link: Link) => (
        <a
          href={link.href}
          onClick={() => toggleMenu()}
          className="text-gray-500 block px-3 py-2 text-base font-medium"
          key={link.label}
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
);

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center w-full h-24">
          <div className="flex items-center w-full justify-between">
            <div>
              <img className="w-full" src="logo.svg" alt="logo" />
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {links.map((link: Link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-gray-500 hover:text-gray-600 px-3 py-2 rounded-md font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <MenuButton showMenu={showMenu} toggleMenu={toggleMenu} />
          </div>
        </div>
      </div>
      {showMenu ? <MobileMenu toggleMenu={toggleMenu} /> : null}
    </nav>
  );
};

export default Navigation;
