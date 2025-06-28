import factoryImg from '../../../public/uploads/factory1.jpg'
export default function WhoWeAre() {
  return (
    <section className="bg-blue-100 px-6 py-10 flex flex-col-reverse md:flex-row items-center justify-between gap-4 rounded-xl">
        <div className="max-w-2xl w-full">
            <h2 className="text-lg md:text-xl font-bold mb-2 text-left">WHO ARE WE?</h2>
            <p className="text-sm md:text-base text-gray-700 mb-3 text-left">We are a trusted platform connecting customers with skilled service providers...</p>
            <p className="text-base md:text-lg font-semibold mb-2 text-blue-900 text-left">We're a team of passionate individuals committed to delivering exceptional home services. Our network of vetted, background-checked professionals ensures that you receive top-notch workmanship and unparalleled customer service.</p>
            <h3 className="text-base md:text-lg font-bold mb-2 mt-5 text-blue-900 text-left">Our partners</h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-800 pl-4">
              <li>Google</li>
              <li>Dell</li>
              <li>TCS</li>
            </ul>
        </div>
        <img src={factoryImg} alt="Factory Worker" className="w-[340px] md:w-[420px] rounded shadow object-cover ml-0 md:ml-4" />
    </section>
  );
}