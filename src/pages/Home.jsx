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
// Aurora canvas hook — Spline-style luminous orbs that chase the mouse
// ─────────────────────────────────────────────────────────────────────────────
// Max pixels any orb / blob is allowed to drift from its resting position
const ORBS_MAX_DRIFT = 150;  // canvas orbs
const BLOB_MAX_DRIFT = 100;  // CSS blobs

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function useAuroraCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animId;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Each orb stores homeX/homeY so we can clamp displacement
    const makeOrb = (hx, hy, radius, lag, offsetX, offsetY, color, opacity) => ({
      homeX: hx, homeY: hy,
      x: hx, y: hy,
      tx: hx, ty: hy,
      radius, lag, offsetX, offsetY, color, opacity,
    });

    const orbs = [
      makeOrb(
        window.innerWidth * 0.65, window.innerHeight * 0.25,
        520, 0.09, 80, -60,
        [[252, 156, 183], [210, 90, 170]], 0.55,
      ),
      makeOrb(
        window.innerWidth * 0.15, window.innerHeight * 0.6,
        440, 0.065, -120, 80,
        [[160, 100, 240], [100, 60, 200]], 0.40,
      ),
      makeOrb(
        window.innerWidth * 0.5, window.innerHeight * 0.85,
        380, 0.05, 0, 140,
        [[80, 220, 160], [40, 180, 200]], 0.30,
      ),
      makeOrb(
        window.innerWidth * 0.1, window.innerHeight * 0.1,
        300, 0.075, -200, -160,
        [[255, 190, 120], [240, 140, 90]], 0.22,
      ),
    ];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const drawOrb = (orb) => {
      const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
      const [c1, c2] = orb.color;
      grad.addColorStop(0,   `rgba(${c1[0]},${c1[1]},${c1[2]},${orb.opacity})`);
      grad.addColorStop(0.45,`rgba(${c2[0]},${c2[1]},${c2[2]},${orb.opacity * 0.55})`);
      grad.addColorStop(1,   `rgba(${c2[0]},${c2[1]},${c2[2]},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        // Raw target: mouse position + per-orb offset
        const rawTx = mouse.x + orb.offsetX;
        const rawTy = mouse.y + orb.offsetY;
        // Clamp displacement from resting home position
        orb.tx = orb.homeX + clamp(rawTx - orb.homeX, -ORBS_MAX_DRIFT, ORBS_MAX_DRIFT);
        orb.ty = orb.homeY + clamp(rawTy - orb.homeY, -ORBS_MAX_DRIFT, ORBS_MAX_DRIFT);
        orb.x += (orb.tx - orb.x) * orb.lag;
        orb.y += (orb.ty - orb.y) * orb.lag;
        drawOrb(orb);
      });

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return canvasRef;
}

// ─────────────────────────────────────────────────────────────────────────────
// Blob parallax hook (CSS blobs layer — sits above canvas for extra depth)
// ─────────────────────────────────────────────────────────────────────────────
function useBlobParallax(factor = 0.018) {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const pos1  = useRef({ x: 0, y: 0 });
  const pos2  = useRef({ x: 0, y: 0 });
  const pos3  = useRef({ x: 0, y: 0 });
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
      const targetX1 = clamp(mouse.current.x * factor,        -BLOB_MAX_DRIFT, BLOB_MAX_DRIFT);
      const targetY1 = clamp(mouse.current.y * factor,        -BLOB_MAX_DRIFT, BLOB_MAX_DRIFT);
      const targetX2 = clamp(-mouse.current.x * factor * 0.7, -BLOB_MAX_DRIFT, BLOB_MAX_DRIFT);
      const targetY2 = clamp(-mouse.current.y * factor * 0.7, -BLOB_MAX_DRIFT, BLOB_MAX_DRIFT);
      const targetX3 = clamp(mouse.current.x * factor * 0.5,  -BLOB_MAX_DRIFT, BLOB_MAX_DRIFT);
      const targetY3 = clamp(-mouse.current.y * factor * 0.5, -BLOB_MAX_DRIFT, BLOB_MAX_DRIFT);

      pos1.current.x += (targetX1 - pos1.current.x) * 0.05;
      pos1.current.y += (targetY1 - pos1.current.y) * 0.05;
      pos2.current.x += (targetX2 - pos2.current.x) * 0.04;
      pos2.current.y += (targetY2 - pos2.current.y) * 0.04;
      pos3.current.x += (targetX3 - pos3.current.x) * 0.03;
      pos3.current.y += (targetY3 - pos3.current.y) * 0.035;

      if (blob1Ref.current)
        blob1Ref.current.style.transform = `translate(${pos1.current.x}px, ${pos1.current.y}px)`;
      if (blob2Ref.current)
        blob2Ref.current.style.transform = `translate(${pos2.current.x}px, ${pos2.current.y}px)`;
      if (blob3Ref.current)
        blob3Ref.current.style.transform = `translate(${pos3.current.x}px, ${pos3.current.y}px)`;

      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [factor]);

  return { blob1Ref, blob2Ref, blob3Ref };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
const Home = () => {
  const { dotRef, ringRef }          = useCursor();
  const canvasRef                    = useAuroraCanvas();
  const { blob1Ref, blob2Ref, blob3Ref } = useBlobParallax(0.022);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      {/* ── Aurora canvas layer ── */}
      <canvas ref={canvasRef} className="aurora-canvas" aria-hidden="true" />

      {/* ── Grain overlay ── */}
      <div className="grain-overlay" aria-hidden="true" />

      <main className="home page-wrapper">
        {/* CSS blobs sit above canvas for an extra parallax depth layer */}
        <div ref={blob1Ref} className="blob blob-1" aria-hidden="true" />
        <div ref={blob2Ref} className="blob blob-2" aria-hidden="true" />
        <div ref={blob3Ref} className="blob blob-3" aria-hidden="true" />

        <div className="home-inner stagger">
          {/* ── Text side ── */}
          <div className="home-text">
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
        </div>
      </main>
    </>
  );
};

export default Home;