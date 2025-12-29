import Link from 'next/link';
import { Home, MapPinOff } from 'lucide-react';
import { Header } from '~/components/layout/Header';
import { Footer } from '~/components/layout/Footer';
import { CategoriesGrid } from '~/components/sections/CategoriesGrid';

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 font-sans">
        {/* Hero / Error Message Section */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

          <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-4 bg-orange-50 rounded-full mb-8 animate-bounce">
                <MapPinOff className="w-12 h-12 text-orange-500" />
              </div>

              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 mb-6 tracking-tight">
                404
              </h1>

              <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 mb-6">
                Oops! We can't seem to find that page.
              </h2>

              <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
                Don't worry though, you're not lost — you're just not where you intended to be.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/">
                  <button className="group relative px-8 py-4 bg-slate-900 text-white font-bold rounded-lg overflow-hidden transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5">
                    <span className="relative z-10 flex items-center gap-2">
                      <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Back to Homepage
                    </span>
                  </button>
                </Link>

                <Link href="/contact-us">
                  <button className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 font-bold rounded-lg transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2">
                    Contact Support
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-10 w-64 h-64 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-1/2 right-10 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        </section>

        {/* Helpful Navigation Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-slate-900">Popular Categories</h3>
              <p className="text-slate-500 mt-2">Maybe looking for one of these will help?</p>
            </div>

            {/* Reuse the existing categories grid but we might want to ensure it works well here. 
                 Since CategoriesGrid includes its own container/section, we might double wrap, 
                 but it should visualy render fine. 
                 Actually CategoriesGrid has <section> inside it with padding. 
                 Let's check if we can pass a className or if it's fixed.
                 It has "py-16". We can just drop it in. 
             */}
            <div className="-mt-16"> {/* Negative margin to offset the components top padding if needed, or just let it breathe */}
              <CategoriesGrid />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
