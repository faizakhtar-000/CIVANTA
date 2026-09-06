

import MapView from "../../components/maps/MapView";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Globe2,
  Cpu,
  MapPin,
  Bell,
  LineChart,
  Eye,
  MessageSquare,
  AlertTriangle,
  Clock,
  Network,
  Users2,
  ChevronRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function Landing() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={fade}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> SIH 2026 · Problem Statement
              SIH260002
            </div>
            <h1
              className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Intelligent Technology.{" "}
              <span className="text-brand-600">Real-World Impact.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-xl">
              An intelligent digital platform designed to make real-world
              problem reporting, monitoring, decision-making and service
              delivery faster, smarter and more accessible.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register">
                <Button size="lg">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="secondary">
                  Explore Platform
                </Button>
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { k: "24K+", v: "Active Users" },
                { k: "8.4K", v: "Issues Resolved" },
                { k: "4.2h", v: "Avg. Response" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-2xl font-extrabold text-slate-900">
                    {s.k}
                  </div>
                  <div className="text-xs text-slate-500">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero visual — abstract platform diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <div className="ml-auto text-xs text-slate-400">
                  civanta.app/live
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Citizen */}
                <div className="col-span-1 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center">
                    <Users2 className="h-5 w-5 text-brand-700" />
                  </div>
                  <div className="mt-3 text-xs font-semibold text-slate-900">
                    Citizen
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Reports issues in local language
                  </div>
                </div>
                {/* Platform core */}
                <div className="col-span-1 rounded-2xl bg-linear-to-br from-brand-600 to-indigo-600 text-white p-4 shadow-lg">
                  <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div className="mt-3 text-xs font-semibold">CIVANTA Core</div>
                  <div className="mt-1 text-[11px] text-white/80">
                    AI · Validation · Routing
                  </div>
                </div>
                {/* Authority */}
                <div className="col-span-1 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="mt-3 text-xs font-semibold text-slate-900">
                    Authority
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    Takes action & resolves
                  </div>
                </div>
              </div>

              {/* Flow arrows */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                <span>Report</span>
                <ChevronRight className="h-4 w-4" />
                <span>Validate</span>
                <ChevronRight className="h-4 w-4" />
                <span>Insight</span>
                <ChevronRight className="h-4 w-4" />
                <span>Action</span>
              </div>

              {/* Live feed mock */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-semibold text-slate-900">
                    Live Activity
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                    Online
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      t: "CVT-10482 · Pothole on MG Road",
                      s: "In Progress",
                      c: "brand",
                    },
                    {
                      t: "CVT-10481 · Water leakage",
                      s: "Assigned",
                      c: "amber",
                    },
                    {
                      t: "CVT-10480 · Streetlight fixed",
                      s: "Resolved",
                      c: "emerald",
                    },
                  ].map((x) => (
                    <div
                      key={x.t}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-700 truncate pr-3">
                        {x.t}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          x.c === "brand"
                            ? "bg-brand-50 text-brand-700"
                            : x.c === "amber"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {x.s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-card border border-slate-200 px-3 py-2 flex items-center gap-2"
            >
              <MapPin className="h-4 w-4 text-brand-600" />
              <span className="text-xs font-semibold">
                Location Intelligence
              </span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-card border border-slate-200 px-3 py-2 flex items-center gap-2"
            >
              <Globe2 className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-semibold">6 Languages</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="border-y border-slate-200 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-6">
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Designed for impact across
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-3 text-slate-500 font-semibold">
            <span>Smart Cities</span>
            <span>Gram Panchayats</span>
            <span>Urban Bodies</span>
            <span>State Govt.</span>
            <span>Citizen Groups</span>
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wider text-brand-600 uppercase">
            The Challenge
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why public problem reporting still fails
          </h2>
          <p className="mt-3 text-slate-600">
            Millions of citizens face friction every day when reporting
            real-world issues. The system is fragmented, slow and opaque.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Globe2,
              title: "Limited accessibility",
              desc: "Platforms are not available in local languages or simple interfaces.",
            },
            {
              icon: Network,
              title: "Fragmented information",
              desc: "Data sits in silos across departments with no unified view.",
            },
            {
              icon: Clock,
              title: "Slow response",
              desc: "Manual routing and verification create delays of days or weeks.",
            },
            {
              icon: Eye,
              title: "Lack of transparency",
              desc: "Users rarely know what happened to their report after submission.",
            },
            {
              icon: AlertTriangle,
              title: "Hard decisions",
              desc: "Authorities lack real-time insights to prioritize action.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-card hover:-translate-y-0.5 transition"
            >
              <div className="h-11 w-11 rounded-xl bg-rose-50 flex items-center justify-center">
                <c.icon className="h-5 w-5 text-rose-600" />
              </div>
              <div className="mt-4 font-semibold text-slate-900">{c.title}</div>
              <div className="mt-1 text-sm text-slate-600">{c.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Flow */}
        <div className="mt-12 rounded-3xl bg-slate-900 text-white p-8 md:p-10">
          <div className="text-xs font-semibold tracking-wider text-brand-300 uppercase">
            The vicious cycle
          </div>
          <div className="mt-3 text-2xl font-bold">
            Problem → Delay → Inefficiency → Impact
          </div>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {[
              {
                t: "Problem",
                d: "Citizen faces an issue but has no simple channel.",
              },
              { t: "Delay", d: "Manual processes slow down verification." },
              {
                t: "Inefficiency",
                d: "Wrong routing wastes time and resources.",
              },
              { t: "Impact", d: "Citizens lose trust; outcomes suffer." },
            ].map((x, i) => (
              <div
                key={x.t}
                className="rounded-2xl bg-white/5 border border-white/10 p-5"
              >
                <div className="text-xs text-brand-300">Step {i + 1}</div>
                <div className="mt-1 font-semibold">{x.t}</div>
                <div className="mt-1 text-sm text-slate-300">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-linear-to-b from-white to-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs font-semibold tracking-wider text-brand-600 uppercase">
              The Solution
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              One Platform. Smarter Decisions. Better Outcomes.
            </h2>
            <p className="mt-3 text-slate-600">
              CIVANTA unifies citizens, data, intelligence and authorities into
              a single trusted loop.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-4 gap-4 relative">
            {[
              {
                icon: MessageSquare,
                title: "User provides information",
                desc: "Citizens submit issues in their language with location & evidence.",
              },
              {
                icon: ShieldCheck,
                title: "Platform validates data",
                desc: "Automated checks ensure quality, prevent duplicates and verify location.",
              },
              {
                icon: Cpu,
                title: "AI generates insights",
                desc: "Smart classification, priority scoring and routing to the right department.",
              },
              {
                icon: CheckCircle2,
                title: "Stakeholders take action",
                desc: "Authorities resolve with full transparency; citizens get live updates.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-soft"
              >
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div className="h-11 w-11 rounded-xl bg-brand-50 flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-brand-700" />
                </div>
                <div className="mt-4 font-semibold text-slate-900">
                  {s.title}
                </div>
                <div className="mt-1 text-sm text-slate-600">{s.desc}</div>
                {i < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 text-brand-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      

{/* GIS MAP */}
<section className="bg-slate-50 border-y border-slate-200">
  <div className="max-w-7xl mx-auto px-6 py-20">

    <div className="max-w-3xl mx-auto text-center">
      <div className="text-xs font-semibold tracking-wider text-brand-600 uppercase">
        GIS Civic Intelligence
      </div>

      <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
        Explore Civic Issues on the Map
      </h2>

      <p className="mt-3 text-slate-600">
        View reported civic problems, their locations and current
        status through our interactive GIS-powered map.
      </p>
    </div>

    <div className="mt-10">
      <MapView height="600px" />
    </div>

  </div>
</section>

{/* FEATURES */}
<section className="max-w-7xl mx-auto px-6 py-20"></section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wider text-brand-600 uppercase">
            Features
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything you need, nothing you don't.
          </h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: Cpu,
              title: "AI-Powered Intelligence",
              desc: "Analyze incoming data and generate useful insights.",
            },
            {
              icon: Zap,
              title: "Smart Classification",
              desc: "Automatically categorize incoming requests.",
            },
            {
              icon: Globe2,
              title: "Multilingual Support",
              desc: "Support for multiple Indian languages.",
            },
            {
              icon: MapPin,
              title: "Location Intelligence",
              desc: "Maps and geo-data where required.",
            },
            {
              icon: Bell,
              title: "Real-Time Tracking",
              desc: "Track progress and status live.",
            },
            {
              icon: LineChart,
              title: "Analytics",
              desc: "Data-driven insights through charts.",
            },
            {
              icon: MessageSquare,
              title: "Notifications",
              desc: "Real-time updates to users.",
            },
            {
              icon: Eye,
              title: "Transparency",
              desc: "Clear status and action history.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-card transition"
            >
              <div className="h-11 w-11 rounded-xl bg-brand-50 group-hover:bg-brand-600 transition flex items-center justify-center">
                <f.icon className="h-5 w-5 text-brand-700 group-hover:text-white transition" />
              </div>
              <div className="mt-4 font-semibold text-slate-900">{f.title}</div>
              <div className="mt-1 text-sm text-slate-600">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-600 via-indigo-600 to-brand-700 text-white p-10 md:p-14">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Ready to make impact?
              </h3>
              <p className="mt-3 text-white/80 max-w-md">
                Join CIVANTA and be part of a smarter, more transparent public
                service ecosystem.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-brand-700 hover:bg-slate-100"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
