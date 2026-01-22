"use client";

import { useState } from "react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      monthlyPrice: 29,
      annualPrice: 24,
      features: [
        "Up to 500 conversations/month",
        "Email support",
        "2 team members",
        "Basic analytics",
        "Standard integrations",
        "99.5% uptime SLA"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Pro",
      description: "Best for growing teams and businesses",
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        "Up to 5,000 conversations/month",
        "Priority support 24/7",
        "10 team members",
        "Advanced analytics & reporting",
        "All integrations",
        "99.9% uptime SLA",
        "Custom AI training",
        "API access"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      monthlyPrice: null,
      annualPrice: null,
      features: [
        "Unlimited conversations",
        "Dedicated account manager",
        "Unlimited team members",
        "Custom analytics & reporting",
        "Custom integrations",
        "99.99% uptime SLA",
        "Advanced AI customization",
        "White-label options",
        "On-premise deployment"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Pricing
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
            Choose the plan that's right for your team.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-black dark:text-white' : 'text-zinc-500 dark:text-zinc-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
              role="switch"
              aria-checked={isAnnual}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-black dark:bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-black dark:text-white' : 'text-zinc-500 dark:text-zinc-500'}`}>
              Annual
            </span>
            {!isAnnual && (
              <span className="text-xs font-semibold text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition-all hover:shadow-xl ${
                plan.popular
                  ? 'bg-black dark:bg-white border-black dark:border-white scale-105 shadow-xl'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-white dark:bg-black text-black dark:text-white text-xs font-bold px-3 py-1 rounded-full border border-black dark:border-white">
                    POPULAR
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.popular ? 'text-white dark:text-black' : 'text-black dark:text-white'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${
                  plan.popular ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-600 dark:text-zinc-400'
                }`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {plan.monthlyPrice ? (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-bold ${
                        plan.popular ? 'text-white dark:text-black' : 'text-black dark:text-white'
                      }`}>
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className={`text-sm ${
                        plan.popular ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-600 dark:text-zinc-400'
                      }`}>
                        /month
                      </span>
                    </div>
                    {isAnnual && (
                      <p className={`text-xs mt-1 ${
                        plan.popular ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-500'
                      }`}>
                        Billed annually (${plan.annualPrice * 12}/year)
                      </p>
                    )}
                  </>
                ) : (
                  <div className={`text-2xl font-bold ${
                    plan.popular ? 'text-white dark:text-black' : 'text-black dark:text-white'
                  }`}>
                    Custom Pricing
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button className={`w-full py-3 px-6 rounded-lg font-semibold mb-6 transition-colors ${
                plan.popular
                  ? 'bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  : 'bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100'
              }`}>
                {plan.cta}
              </button>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'text-white dark:text-black' : 'text-black dark:text-white'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className={`text-sm ${
                      plan.popular ? 'text-zinc-100 dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

