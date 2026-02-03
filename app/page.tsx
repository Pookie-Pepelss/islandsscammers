"use client";

import { useState, MouseEvent, useRef, useEffect } from "react";

export default function Page() {
  const [active, setActive] = useState<"enthusaist" | "warrior" | null>(null);
  const [expandedSrc, setExpandedSrc] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dragStart = useRef({ x: 0, y: 0 });
  const startPan = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const closeExpanded = () => {
    setExpandedSrc(null);
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: MouseEvent<HTMLImageElement>) => {
    if (!isZoomed) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    startPan.current = pan;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({ x: startPan.current.x + dx, y: startPan.current.y + dy });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageClick = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (isZoomed) {
      const moveX = Math.abs(pan.x - startPan.current.x);
      const moveY = Math.abs(pan.y - startPan.current.y);
      if (moveX < 5 && moveY < 5) {
        setIsZoomed(false);
        setPan({ x: 0, y: 0 });
      }
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomOrigin({ x, y });
      setIsZoomed(true);
      setPan({ x: 0, y: 0 });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255,255,255,0.1);
            border-radius: 50%;
            border-top-color: #ef4444;
            animation: spin 1s ease-in-out infinite;
          }
        `}</style>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0505] to-black text-zinc-100">
      <style>{`
        @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <main className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-4xl font-bold mb-4">Roblox Islands Scam Documentation</h2>
        <p className="text-zinc-400 max-w-3xl mb-8">
          Evidence-focused documentation of reported scam activity.
        </p>

        <div className="flex gap-4 mb-12">
          <button 
            onClick={() => setActive("enthusaist")} 
            className={`px-6 py-3 rounded-xl border transition-all duration-300 ${active === "enthusaist" ? "bg-red-600/20 border-red-500/50 text-white" : "bg-white/5 border-white/10 hover:bg-white/10 text-zinc-400"}`}
          >
            Enthusaist
          </button>
          <button 
            onClick={() => setActive("warrior")} 
            className={`px-6 py-3 rounded-xl border transition-all duration-300 ${active === "warrior" ? "bg-red-600/20 border-red-500/50 text-white" : "bg-white/5 border-white/10 hover:bg-white/10 text-zinc-400"}`}
          >
            Warriorofthedark
          </button>
        </div>

        {active === "enthusaist" && (
          <section className="bg-black/40 border border-red-500/10 rounded-2xl p-8" style={{ animation: "fadeInUp 0.4s ease-out" }}>
            <h3 className="text-2xl font-semibold mb-4 text-red-400">Discord: @anticheatdev</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["/evidence1.png", "/evidence2.png", "/evidence3.png", "/evidence4.png", "/universalevidence.png"].map((src, i) => (
                <div key={i} className="relative group">
                  <img 
                    src={src} 
                    alt={`Enthusaist Evidence ${i + 1}`}
                    className="rounded-xl border border-white/5 w-full h-48 object-cover transition-all" 
                  />
                  <button 
                    onClick={() => setExpandedSrc(src)}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                  >
                    <span className="text-sm font-medium bg-red-600/80 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">Expand</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {active === "warrior" && (
          <section className="bg-black/40 border border-red-500/10 rounded-2xl p-8" style={{ animation: "fadeInUp 0.4s ease-out" }}>
            <h3 className="text-2xl font-semibold mb-4 text-red-400">Discord: @warriorofthedark971</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["/evidence1warrior.png", "/evidence2warrior.png", "/evidence3warrior.png", "/evidence4warrior.png", "/evidence5warrior.png", "/evidence6warrior.png", "/evidence7warrior.jpg", "/evidence8warrior.jpg", "/evidence9warrior.jpg", "/evidence10warrior.jpg", "/universalevidence.png"].map((src, i) => (
                <div key={i} className="relative group">
                  <img 
                    src={src} 
                    alt={`Warrior Evidence ${i + 1}`}
                    className="rounded-xl border border-white/5 w-full h-48 object-cover transition-all" 
                  />
                  <button 
                    onClick={() => setExpandedSrc(src)}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                  >
                    <span className="text-sm font-medium bg-red-600/80 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">Expand</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {expandedSrc && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" 
          onClick={closeExpanded}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="relative max-w-5xl max-h-full flex items-center justify-center" style={{ animation: "zoomIn 0.2s ease-out" }}>
            <img 
              src={expandedSrc} 
              alt="Expanded Evidence"
              className={`max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-red-500/20 ${isDragging ? '' : 'transition-transform duration-300 ease-out'} ${isZoomed ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'}`}
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${isZoomed ? 2.5 : 1})`,
                transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`
              }}
              onClick={handleImageClick}
              onMouseDown={handleMouseDown}
            />
            {!isZoomed && (
              <button onClick={(e) => { e.stopPropagation(); closeExpanded(); }} className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 flex items-center justify-center rounded-md hover:bg-red-600 transition-colors">
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
