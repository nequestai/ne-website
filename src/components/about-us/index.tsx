import styles from './style.module.css';

const FeatureSection = () => (
  <section id="team" className="bg-white pb-6">
    <div className="max-w-7xl mx-auto pt-8 pb-16">
      <div className="container mx-auto bg-white">
        <div className="text-center p-4">
          <h4 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">OUR TEAM</h4>
          <p className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900">
            On a mission to{` `}
            <span className={`${styles[`highlight-container`]} p-2`}>
              <span className={`${styles.highlight} text-white`}>democratize</span>
            </span>
            {` `}
            neurological care
          </p>
          <br />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col justify-center text-center">
            <div
              className="rounded-full border-2 border-indigo-600 h-24 w-24 flex
                    items-center justify-center bg-white mx-auto mt-4 overflow-hidden"
            >
              <img src="/images/sheela.png" alt="sheela" width={200} height={200} />
            </div>
            <div>
              <p className="font-bold text-teal">Dr. Sheela Toprani</p>
              <p className="text-teal text-sm">Co-Founder / CEO</p>
            </div>
          </div>
          <div className="flex flex-col justify-center text-center">
            <div
              className="rounded-full border-2 border-indigo-600 h-24 w-24 flex items-center
            justify-center bg-white mx-auto mt-4 overflow-hidden"
            >
              <img src="/images/satya.jpg" alt="satya" width={200} height={200} />
            </div>
            <div>
              <p className="font-bold text-teal">Satya Sampathirao</p>
              <p className="text-teal text-sm">Co-Founder / CTO</p>
            </div>
          </div>
          <div className="flex flex-col justify-center text-center">
            <div
              className="rounded-full border-2 border-indigo-600 h-24 w-24 flex
                    items-center justify-center bg-white mx-auto mt-4 overflow-hidden"
            >
              <img src="/images/anya.jpg" alt="anya" width={200} height={200} />
            </div>
            <div>
              <p className="font-bold text-teal">Anya Peck</p>
              <p className="text-teal text-sm">Product Manager</p>
            </div>
          </div>
          <div className="flex flex-col justify-center text-center">
            <div
              className="rounded-full border-2 border-indigo-600 h-24 w-24 flex
                    items-center justify-center bg-white mx-auto mt-4 overflow-hidden"
            >
              <img src="/images/sid.jpg" alt="sid" width={200} height={200} />
            </div>
            <div>
              <p className="font-bold text-teal">Siddhardha Penmetsa</p>
              <p className="text-teal text-sm">Data Scientist</p>
            </div>
          </div>
          {/* <div className="flex flex-col justify-center text-center">
            <div
              className="rounded-full border-2 border-indigo-600 h-24 w-24 flex
                      items-center justify-center bg-white mx-auto mt-4"
            >
              <Image src="/images/alex.png" alt="alex" width={200} height={200} />
            </div>
            <p className="font-bold text-teal">Alex Estrada</p>
            <p className="text-teal text-sm">Software Engineer</p>
          </div> */}
          <div className="flex flex-col justify-center text-center">
            <div
              className="rounded-full border-2 border-indigo-600 h-24 w-24 flex
                      items-center justify-center bg-white mx-auto mt-4 overflow-hidden"
            >
              <img src="/images/rocelle.jpg" alt="rocelle" width={200} height={200} />
            </div>
            <p className="font-bold text-teal">Rocelle Evangelista</p>
            <p className="text-teal text-sm">Clinical Research</p>
          </div>
          <div className="flex flex-col justify-center text-center">
            <div
              className="rounded-full border-2 border-indigo-600 h-24 w-24 flex
                      items-center justify-center bg-white mx-auto mt-4 overflow-hidden"
            >
              <img src="/images/janice.jpg" alt="janice" width={200} height={200} />
            </div>
            <p className="font-bold text-teal">Janice Hu</p>
            <p className="text-teal text-sm">R&D Intern</p>
          </div>
          <div className="flex flex-col justify-center text-center">
            <div
              className="rounded-full border-2 border-indigo-600 h-24 w-24 flex
                      items-center justify-center bg-white mx-auto mt-4 overflow-hidden"
            >
              <img src="/images/talal.jpg" alt="talal" width={200} height={200} />
            </div>
            <p className="font-bold text-teal">Talal Muzaffar</p>
            <p className="text-teal text-sm">Data Science Intern</p>
          </div>
          {/* <div className="flex flex-col justify-center">
                  <div
                    className="rounded-full border-2 border-indigo-600 h-24 w-24 flex
                      items-center justify-center bg-white mx-auto mt-4"
                  >
                    <Image src="/images/reza.png" alt="reza" width={200} height={200} />
                  </div>
                  <p className="font-bold text-teal">Reza Moein Taahavi</p>
                  <p className="text-teal text-sm">Business Strategy & Regulatory</p>
                </div> */}
        </div>
      </div>
    </div>
  </section>
);

export default FeatureSection;
