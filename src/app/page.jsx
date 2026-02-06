import React, { Suspense, lazy } from "react";
import Navbar from "../components/byte-forge/Navbar";
import Hero from "../components/byte-forge/Hero";
import About from "../components/byte-forge/About";
import Members from "../components/byte-forge/Members";
import JoinUs from "../components/byte-forge/JoinUs";
import Footer from "../components/byte-forge/Footer";

const CursorGlow = lazy(() => import("../components/byte-forge/CursorGlow"));

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <CursorGlow />
      </Suspense>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Members />
        <JoinUs />
        <Footer />
      </main>
    </>
  );
}
