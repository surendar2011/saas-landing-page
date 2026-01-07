export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge/Pill for positioning */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-8">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Growth & Scale
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-6 leading-tight">
            Scale your support without scaling your headcount.
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            The most advanced AI layer for your existing helpdesk. Deploy in minutes, integrate with your stack, and watch your CSAT scores soar.
          </p>

          {/* CTA Button */}
          <div className="mb-6">
            <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
              Start Your 14-Day Trial
            </button>
          </div>

          {/* Social Proof */}
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            No credit card required. Setup takes 5 minutes.
          </p>
        </div>
      </section>

      {/* Spacer sections to enable scrolling */}
      <section id="features" className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            Features
          </h2>
        </div>
      </section>

      <section id="pricing" className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            Pricing
          </h2>
        </div>
      </section>

      <section id="docs" className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
            Docs
          </h2>
        </div>
      </section>
    </div>
  );
}
