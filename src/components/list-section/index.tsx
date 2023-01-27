import { tw } from 'twind';
import PeopleSvg from '@/constants/svg/people.svg';

const listItems = [
  {
    title: `Neurologists`,
    description: `Neurological diagnoses often cannot be made on imaging and rely on an
     exam, which is time-consuming and cumbersome to perform without generating quantifiable results.
    `,
  },
  {
    title: `Patients`,
    description: `Patients in Canada wait an average of 110 days between requesting
      an appointment and seeing a neurologist.`,
  },
  {
    title: `Hospitals`,
    description: `Hospitals are losing millions in billing dollars because the complete
      exam cannot be performed virtually.`,
  },
];

const ListSection = () => (
  <section className={tw(`lg:py-18 pt-16 overflow-hidden`)}>
    <div className={tw(`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white`)}>
      <div id="about" className={tw(`text-center`)}>
        <h2 className={tw(`text-base text-indigo-600 font-semibold tracking-wide uppercase`)}>A better mousetrap</h2>
        <p className={tw(`mt-2 pb-4 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900`)}>We can do better</p>
      </div>
      <div className={tw(`flex flex-wrap -mx-8 items-center`)}>
        <div className={tw(`w-full lg:w-1/2 px-8`)}>
          <ul className={tw(`space-y-12`)}>
            {listItems.map((item, index) => (
              <li className={tw(`flex -mx-4`)} key={item.title}>
                <div className={tw(`px-4`)}>
                  <span
                    className={tw(`flex w-16 h-16 mx-auto items-center
                      justify-center text-2xl font-bold rounded-full
                      bg-blue-50 text-blue-500`)}
                  >
                    {index + 1}
                  </span>
                </div>
                <div className={tw(`px-4`)}>
                  <h3 className={tw(`my-4 text-xl font-semibold`)}>{item.title}</h3>
                  <p className={tw(`text-gray-500 leading-loose`)}>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={tw(`w-full lg:w-1/2 p-12 md:p-24`)}>
          <div className={tw(`lg:mb-12 lg:mb-0 pb-12 lg:pb-0 mt-16 lg:mt-0 mx-6 lg:mx-0`)}>
            <PeopleSvg width="100%" height="100%" />
          </div>
        </div>
      </div>
      <div className={tw(`text-center mt-16`)}>
        <p className={tw(`text-gray-500 text-lg m-12 p-12 rounded-lg leading-relaxed bg-blue-100`)}>
          Our AI-augmented neurological virtual exam software, <b>designed by doctors for doctors</b>, helps assess the
          possibility of a patient having one or more of 600+ reported nervous system disorders.
        </p>
      </div>
    </div>
  </section>
);

export default ListSection;
