import React, { useEffect, useRef } from "react";
import "./Home.css";

// ─────────────────────────────────────────────────────────────────────────────
// Custom cursor hook — dot + lagging ring, both driven by rAF
// ─────────────────────────────────────────────────────────────────────────────
function useCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const rafRef  = useRef(null);

  useEffect(() => {
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
      }
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const grow = () => {
      if (ringRef.current) ringRef.current.classList.add("cursor-ring--hover");
      if (dotRef.current)  dotRef.current.classList.add("cursor-dot--hover");
    };
    const shrink = () => {
      if (ringRef.current) ringRef.current.classList.remove("cursor-ring--hover");
      if (dotRef.current)  dotRef.current.classList.remove("cursor-dot--hover");
    };
    const targets = document.querySelectorAll("a, button, .chip");
    targets.forEach((el) => { el.addEventListener("mouseenter", grow); el.addEventListener("mouseleave", shrink); });
    return () => targets.forEach((el) => { el.removeEventListener("mouseenter", grow); el.removeEventListener("mouseleave", shrink); });
  });

  return { dotRef, ringRef };
}

// ─────────────────────────────────────────────────────────────────────────────
// Magnetic element hook
// ─────────────────────────────────────────────────────────────────────────────
function useMagnetic({ strength = 0.35, radius = 120 } = {}) {
  const ref = useRef(null);
  const cur = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        const pull = (1 - dist / radius);
        cur.current = { x: dx * pull * strength, y: dy * pull * strength };
      } else {
        cur.current = { x: 0, y: 0 };
      }
    };

    const loop = () => {
      if (el) el.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px)`;
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(loop);
    const reset = () => { cur.current = { x: 0, y: 0 }; };
    el.addEventListener("mouseleave", reset);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [strength, radius]);

  return ref;
}

// ─────────────────────────────────────────────────────────────────────────────
// Blob parallax hook
// ─────────────────────────────────────────────────────────────────────────────
function useBlobParallax(factor = 0.018) {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const pos1  = useRef({ x: 0, y: 0 });
  const pos2  = useRef({ x: 0, y: 0 });
  const raf   = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      mouse.current = { x: e.clientX - cx, y: e.clientY - cy };
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      pos1.current.x += (mouse.current.x * factor - pos1.current.x) * 0.05;
      pos1.current.y += (mouse.current.y * factor - pos1.current.y) * 0.05;
      pos2.current.x += (-mouse.current.x * factor * 0.7 - pos2.current.x) * 0.04;
      pos2.current.y += (-mouse.current.y * factor * 0.7 - pos2.current.y) * 0.04;
      if (blob1Ref.current)
        blob1Ref.current.style.transform = `translate(${pos1.current.x}px, ${pos1.current.y}px)`;
      if (blob2Ref.current)
        blob2Ref.current.style.transform = `translate(${pos2.current.x}px, ${pos2.current.y}px)`;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [factor]);

  return { blob1Ref, blob2Ref };
}

// ─────────────────────────────────────────────────────────────────────────────
// Avatar parallax hook
// ─────────────────────────────────────────────────────────────────────────────
function useAvatarParallax(factor = 0.025) {
  const ref   = useRef(null);
  const pos   = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const raf   = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      mouse.current = { x: e.clientX - cx, y: e.clientY - cy };
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      pos.current.x += (mouse.current.x * factor - pos.current.x) * 0.06;
      pos.current.y += (mouse.current.y * factor - pos.current.y) * 0.06;
      if (ref.current)
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [factor]);

  return ref;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
const Home = () => {
  const { dotRef, ringRef }    = useCursor();
  const { blob1Ref, blob2Ref } = useBlobParallax(0.022);
  const avatarRef   = useAvatarParallax(0.028);
  // const resumeRef   = useMagnetic({ strength: 0.45, radius: 110 });
  // const mediaKitRef = useMagnetic({ strength: 0.45, radius: 110 });

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      <main className="home page-wrapper">
        <div ref={blob1Ref} className="blob blob-1" aria-hidden="true" />
        <div ref={blob2Ref} className="blob blob-2" aria-hidden="true" />

        <div className="home-inner stagger">
          {/* ── Text side ── */}
          <div className="home-text">
            {/* <p className="home-tagline">Seattle · San Francisco · Sydney</p> */}
            <h1 className="home-heading">
              Hello, I'm Aolin!
            </h1>
            <p className="home-bio">
              I build thoughtful software, create content that connects, and love
              learning in public. Always exploring the overlap between tech and people.
            </p>

            <div className="home-ctas ctas-reveal">
              <a href="/resume.pdf" className="btn btn-primary magnetic" download>
                <span>Resume</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
              <a href="/media-kit.pdf" className="btn btn-secondary magnetic" download>
                <span>Media Kit</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Visual side ── */}
          <div className="home-visual">
            <div ref={avatarRef} className="avatar-wrapper">
              <div className="avatar-ring">
                <img src="memoji.jpg" alt="Aolin Xu" className="avatar-img" />
              </div>
            </div>
          </div>
        </div>

        <div className="home-scroll-hint" aria-hidden="true">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </main>
    </>
  );
};

export default Home;