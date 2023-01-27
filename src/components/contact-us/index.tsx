import React from 'react';

const ContactUs = () => {
  React.useEffect(() => {
    const id = `typef_orm`;
    const b = `https://embed.typeform.com/`;
    if (!document.getElementById.call(document, `typef_orm`)) {
      const js: any = document.createElement.call(document, `script`);
      js.id = id;
      js.src = `${b}embed.js`;
      // eslint-disable-next-line prefer-destructuring
      const q = document.getElementsByTagName.call(document, `script`)[0];
      q.parentNode?.insertBefore(js, q);
    }
  }, []);

  return (
    <section id="contact" className="bg-gradient-to-b from-gray-100 to-white shadow-inner pt-12">
      <div className="relative max-w-7xl mx-auto mb-24">
        <div className="overflow-hidden lg:max-w-none lg:flex">
          <div className="py-8 px-6 md:px-0 lg:flex-shrink-1/2">
            <h2 className="text-4xl lg:text-7xl font-bold text-gray-800 mb-12">Have a question?</h2>
            <p className="mt-6 text-base leading-6 text-gray-500">
              We are always happy to chat. Feel free to reach out to us!
            </p>
          </div>
          <div
            className="typeform-widget"
            data-url="https://form.typeform.com/to/wTqcQGzW?typeform-medium=embed-snippet"
            data-transparency="50"
            data-hide-headers="true"
            data-hide-footer="true"
            style={{ width: `100%`, height: `500px`, padding: `20px 40px` }}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
