import Image from 'next/image';

const FeatureSection = () => (
  <section id="team" className="bg-white pb-6">
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="container mx-auto bg-white">
        <div className="text-center">
          <h4 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">OUR TEAM</h4>
          <p className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900">
            On a mission to democratize neurological care
          </p>
        </div>
        <div
          className="grid grid-rows-15 grid-cols-10 gap-2 md:my-32 text-white md:text-black"
          style={{
            minHeight: `250px`,
          }}
        >
          <div
            className="grid grid-flow-col md:grid-flow-row p-4 col-span-10 md:col-span-2
              row-span-15 w-full bg-indigo-600 rounded-lg"
          >
            <div className="flex flex-col justify-center md:-mt-28 text-center">
              <div>
                <p className="font-bold text-teal">Satya Sampathirao</p>
                <p className="text-teal text-sm">Chief Technology Officer</p>
              </div>
              <div
                className="rounded-full border-2 border-sky-500 h-24 w-24 flex items-center
              justify-center bg-white mx-auto mt-4"
              >
                <Image src="/images/satya.png" alt="satya" width={200} height={200} />
              </div>
            </div>
            <p className="flex justify-center items-center text-white font-bold">Co-Founders</p>
            <div className="flex flex-col justify-center md:-mb-28 text-center">
              <div
                className="rounded-full border-2 border-sky-500 h-24 w-24 flex
                  items-center justify-center bg-white mx-auto mt-4"
              >
                <Image src="/images/sheela.png" alt="sheela" width={200} height={200} />
              </div>
              <div>
                <p className="font-bold text-teal">Dr. Sheela Toprani</p>
                <p className="text-teal text-sm">Chief Empathy Officer</p>
              </div>
            </div>
          </div>
          <div
            className="grid grid-flow-col md:grid-flow-row p-4 col-span-10 md:col-span-2
              row-span-15 w-full h-200 bg-blue-600 rounded-lg"
          >
            <div className="flex flex-col justify-center md:-mt-28 text-center">
              <div>
                <p className="font-bold text-teal">Dr. Simen Oestmo</p>
                <p className="text-teal text-sm">Data Scientist</p>
              </div>
              <div
                className="rounded-full border-2 border-sky-500 h-24 w-24 flex
                  items-center justify-center bg-white mx-auto mt-4"
              >
                <Image src="/images/simen.png" alt="simen" width={200} height={200} />
              </div>
            </div>
            <p className="flex justify-center items-center text-white font-bold">Core Team</p>
            <div className="flex flex-col justify-center md:-mb-28 text-center">
              <div
                className="rounded-full border-2 border-sky-500 h-24 w-24 flex
                  items-center justify-center bg-white mx-auto mt-4"
              >
                <Image src="/images/anya.png" alt="anya" width={200} height={200} />
              </div>
              <div>
                <p className="font-bold text-teal">Anya Peck</p>
                <p className="text-teal text-sm">Product Manager</p>
              </div>
            </div>
          </div>
          <div
            className="grid grid-flow-row p-4 col-span-10 md:col-span-6
              row-span-15 w-full h-200 bg-purple-600 rounded-lg"
          >
            <div className="flex justify-around md:-mt-28 text-center">
              <div className="flex flex-col justify-center">
                <p className="font-bold text-teal">Alex Estrada</p>
                <p className="text-teal text-sm">Software Engineer</p>
                <div
                  className="rounded-full border-2 border-sky-500 h-24 w-24 flex
                    items-center justify-center bg-white mx-auto mt-4"
                >
                  <Image src="/images/alex.png" alt="alex" width={200} height={200} />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-bold text-teal">Rocelle Evangelista</p>
                <p className="text-teal text-sm">Clinical Research</p>
                <div
                  className="rounded-full border-2 border-sky-500 h-24 w-24 flex
                    items-center justify-center bg-white mx-auto mt-4"
                >
                  <Image src="/images/rocelle.png" alt="rocelle" width={200} height={200} />
                </div>
              </div>
            </div>
            <p className="flex justify-center items-center text-white font-bold">Interns & Ancillary Team</p>
            <div className="flex justify-around md:-mb-28 text-center">
              <div className="flex flex-col justify-center">
                <div
                  className="rounded-full border-2 border-sky-500 h-24 w-24 flex
                    items-center justify-center bg-white mx-auto mt-4"
                >
                  <Image src="/images/janice.png" alt="janice" width={200} height={200} />
                </div>
                <p className="font-bold text-teal">Janice Hu</p>
                <p className="text-teal text-sm">Research & Development</p>
              </div>
              <div className="flex flex-col justify-center">
                <div
                  className="rounded-full border-2 border-sky-500 h-24 w-24 flex
                    items-center justify-center bg-white mx-auto mt-4"
                >
                  <Image src="/images/talal.png" alt="talal" width={200} height={200} />
                </div>
                <p className="font-bold text-teal">Talal Muzaffar</p>
                <p className="text-teal text-sm">User Experience</p>
              </div>
              {/* <div className="flex flex-col justify-center">
                <div
                  className="rounded-full border-2 border-sky-500 h-24 w-24 flex
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
      </div>
    </div>
  </section>
);

export default FeatureSection;
