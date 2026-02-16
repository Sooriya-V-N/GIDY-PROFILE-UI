import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5">
        <h1 className="text-2xl font-bold text-gray-900">Gidy</h1>
        <button
          onClick={() => navigate("/myprofile")}
          className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          View Profile
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 md:px-20 mt-20">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Build Your Professional <br />
          <span className="text-gray-500">Digital Identity</span>
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          Showcase your skills, experience, and achievements in a beautifully
          designed profile.
        </p>

        <button
          onClick={() => navigate("/myprofile")}
          className="mt-8 bg-black text-white px-8 py-3 rounded-xl text-lg hover:bg-gray-800 transition duration-300"
        >
          View My Profile
        </button>
      </section>

      {/* Features */}
      <section className="mt-28 px-6 md:px-20 grid md:grid-cols-3 gap-10 pb-20">
        <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold">Customizable</h3>
          <p className="mt-3 text-gray-600">
            Personalize your profile with skills and achievements.
          </p>
        </div>

        <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold">Responsive</h3>
          <p className="mt-3 text-gray-600">
            Optimized for mobile, tablet, and desktop.
          </p>
        </div>

        <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold">Interactive</h3>
          <p className="mt-3 text-gray-600">
            Real-time updates and engaging user experience.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
