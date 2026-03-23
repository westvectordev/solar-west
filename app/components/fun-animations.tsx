"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function FunAnimations() {
  useEffect(() => {
    const nodes = gsap.utils.toArray<HTMLElement>("[data-gsap='fade-up']");
    if (!nodes.length) {
      return;
    }

    gsap.fromTo(
      nodes,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        clearProps: "all",
      }
    );
  }, []);

  return null;
}
