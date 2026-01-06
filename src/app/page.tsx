export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-4">
            Welcome to Your SaaS
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Scroll down to see the Dynamic Island navbar expand
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
