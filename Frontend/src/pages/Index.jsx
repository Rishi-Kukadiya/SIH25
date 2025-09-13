import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { BookOpen, ShieldCheck, Server } from "lucide-react"; // icons for features

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-100 font-sans text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 md:py-32 text-white bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-sky-700/80"></div>
        <div className="container mx-auto px-6 text-center max-w-5xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight animate-fade-in">
            Intelligent Campus Management, Simplified
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            A secure, centralized platform for managing student and faculty profiles, academic records, and university-wide data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/login">
              {/* Primary Button Style */}
              <Button className="bg-white text-slate-900 font-semibold px-8 py-3 rounded-md shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-slate-200 hover:shadow-xl">
                Login to Portal
              </Button>
            </Link>
            <Link to="/resources">
              {/* Secondary Button Style */}
              <Button className="bg-transparent text-white font-semibold px-8 py-3 rounded-md border-2 border-white transform transition-all duration-300 hover:scale-105 hover:bg-white hover:text-slate-900">
                View User Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-sky-50 to-sky-100">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
            Our Commitment to Academic Integrity
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            We provide a robust digital infrastructure designed to support the dynamic needs of modern universities. Our platform ensures that student and faculty data is managed with the highest level of security and confidentiality. From enrollment to alumni status, we streamline the entire academic journey, empowering administrators with powerful tools and providing students and faculty with seamless access to their information.
          </p>
          <Link to="/mission">
            <Button variant="link" className="text-sky-700 hover:text-sky-900 font-semibold text-lg">
              Learn About Our Security Protocols &rarr;
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-tr from-sky-50 via-white to-sky-100 relative">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">
            A Unified Platform for Your Campus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-sky-100">
              <ShieldCheck className="w-10 h-10 text-sky-700 mb-4" />
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">A user profile or ID card.</h3>
              <p className="text-gray-700">
                Maintain detailed and up-to-date records for every student, including academic progress, course enrollment, contact information, and fee status in one secure location.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-sky-100">
              <BookOpen className="w-10 h-10 text-sky-700 mb-4" />
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">A clipboard or a presentation screen.</h3>
              <p className="text-gray-700">
                Equip your faculty with dedicated portals to manage course materials, submit grades, view student rosters, and communicate with their departments effortlessly.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-sky-100">
              <Server className="w-10 h-10 text-sky-700 mb-4" />
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">A shield with a checkmark.</h3>
              <p className="text-gray-700">
                Engineered to meet stringent data protection standards (like GDPR and FERPA), ensuring all university information is encrypted, auditable, and securely stored.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-blue-100 py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">SmartStudentHub</h3>
            <p className="text-sm">
              A secure and centralized platform for academic data management and university administration.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-sky-300 transition">Platform Features</Link></li>
              <li><Link to="/mission" className="hover:text-sky-300 transition">System Status</Link></li>
              <li><Link to="/resources" className="hover:text-sky-300 transition">User Guides & FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-sky-300 transition">Support Center</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-sky-300 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-sky-300 transition">Terms of Service</Link></li>
              <li><Link to="/accessibility" className="hover:text-sky-300 transition">Accessibility</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <p className="text-sm mb-2">Email: support@youruniversity.edu</p>
            <p className="text-sm">IT Helpdesk: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-blue-800 text-center text-sm text-blue-300">
          © {new Date().getFullYear()} © 2025 SmartStudentHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;

