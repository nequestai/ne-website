import styles from './style.module.css';

const listItems = [
  {
    title1: `Tools for`,
    title2: `to provide personalized care`,
    description: `Neurological diagnoses often cannot be made on imaging and rely on an
     exam, which is cumbersome to perform without generating quantifiable results.
    `,
    subject: ` neurologists `,
  },
  {
    title: `Reduced wait times for`,
    description: `Patients in Canada wait an average of 110 days between requesting
      an appointment and seeing a neurologist.`,
    subject: ` patients `,
  },
  {
    title: `Improved efficiency for`,
    description: `Despite significant treatment gaps, teleneurology adoption has been limited 
    due to its impracticality.`,
    subject: ` hospitals `,
  },
];

const ListSection = () => (
  <section className="lg:py-18 pt-16 overflow-hidden">
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white">
      <div id="about" className="pt-2 text-center">
        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">A better mousetrap</h2>
        <p className="mt-4 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900">We can do better</p>
      </div>
      <div className="mt-12">
        <p className="text-gray-500 text-xl p-12 rounded-lg leading-relaxed border-2">
          <b>NEquest</b> is a telemedicine platform <b>designed by doctors for doctors</b> that enables neurologists to
          conduct remote neurological exams and track patient progress with a comprehensive test battery. <br /> <br />
          Patients complete tasks asynchronously, with quantified results securely uploaded for review by their
          neurologist. This saves valuable time for personalized care during synchronous appointments and informs
          clinical decisions backed by objective insights.
        </p>
      </div>
      <div className="flex flex-wrap py-6 mt-12 items-center justify-center">
        <div className="w-full lg:w-1/2 px-4 md:px-8">
          <ul className="space-y-12">
            {listItems.map((item, index) => (
              <li className="flex -mx-4" key={item.title}>
                <div>
                  <span
                    className="flex w-16 h-16 mx-auto items-center
                      justify-center text-2xl font-bold rounded-full
                      bg-blue-50 text-blue-500"
                  >
                    {index + 1}
                  </span>
                </div>
                <div className="px-4">
                  <h3 className="my-2 text-xl font-semibold">
                    {item.title ? (
                      <span>
                        {item.title}
                        {` `}
                        <span className={styles[`highlight-container`]}>
                          <span className={`${styles.highlight} text-white`}>{item.subject}</span>
                        </span>
                      </span>
                    ) : (
                      <span>
                        {item.title1}
                        {` `}
                        <span className={styles[`highlight-container`]}>
                          <span className={`${styles.highlight} text-white`}>{item.subject}</span>
                        </span>
                        {` `}
                        {item.title2}
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-500 leading-loose">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:w-full lg:w-1/2 md:w-1/3">
          <div className="lg:pb-0 mt-16 lg:mt-0 lg:mx-0">
            <img src="images/online-doc.svg" alt="doctor" width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ListSection;
