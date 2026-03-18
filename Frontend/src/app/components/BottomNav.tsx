import { useNavigate, useLocation } from "react-router";
import { Home, FileText, MessageSquare, User } from "lucide-react";
import { motion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { id: "home",     label: "Home",     icon: Home,          path: "/dashboard" },
  { id: "bids",     label: "My Bids",  icon: FileText,      path: "/my-bids" },
  { id: "messages", label: "Messages", icon: MessageSquare, path: "/messages" },
  { id: "profile",  label: "Profile",  icon: User,          path: "/worker/1" },
];

// ── Geometry constants ───────────────────────────────────────────────────────
const BAR_H    = 68;   // height of the solid bar
const DIP_W    = 88;   // total width of the U cutout
const DIP_D    = 32;   // depth of the U (how far down it dips into the bar)
const CIRCLE_D = 52;   // diameter of the floating green active-tab circle
// Total SVG viewBox height: bar + extra space above for the floating circle
const VB_H = BAR_H;

/**
 * Build the SVG "top-edge" path for the bar:
 * The path traces the full top edge of the bar, including a smooth
 * U-shaped cutout at position cx, going DOWN into the bar body.
 * Bottom of the bar is always at VB_H.
 */
function buildPath(cx: number, vbW: number): string {
  const hw  = DIP_W / 2;
  const bcp = hw * 0.6; // cubic bezier control-point spread for the shoulder smoothness

  return [
    // Start top-left, go right to the left edge of the dip
    `M 0 0`,
    `L ${cx - hw} 0`,
    // Left shoulder: curve down into the U
    `C ${cx - hw + bcp} 0, ${cx - bcp} ${DIP_D}, ${cx} ${DIP_D}`,
    // Right shoulder: curve back up from the U
    `C ${cx + bcp} ${DIP_D}, ${cx + hw - bcp} 0, ${cx + hw} 0`,
    // Continue flat to the right edge
    `L ${vbW} 0`,
    // Close the rectangle: right side, bottom, left side back to start
    `L ${vbW} ${VB_H}`,
    `L 0 ${VB_H}`,
    `Z`,
  ].join(" ");
}

// ── Component ────────────────────────────────────────────────────────────────
export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const barRef   = useRef<HTMLDivElement>(null);
  const [vbW, setVbW] = useState(390);

  const isActive = (path: string) => {
    if (path === "/dashboard")
      return location.pathname === "/dashboard" || location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const activeIndex   = NAV_ITEMS.findIndex((item) => isActive(item.path));
  const resolvedIndex = activeIndex === -1 ? 0 : activeIndex;

  // Slot centre in viewBox coords
  const slotW   = vbW / NAV_ITEMS.length;
  const targetX = slotW * resolvedIndex + slotW / 2;

  // Spring for smooth slide
  const springX = useSpring(targetX, { stiffness: 340, damping: 30, mass: 1 });

  useEffect(() => { springX.set(targetX); }, [targetX, springX]);

  // Track element width with ResizeObserver
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setVbW(el.offsetWidth));
    ro.observe(el);
    setVbW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Reactively build path from spring value
  const [pathD, setPathD] = useState(() => buildPath(targetX, vbW));
  useEffect(
    () => springX.on("change", (x) => setPathD(buildPath(x, vbW))),
    [springX, vbW],
  );

  // Circle left: centred on the spring x position
  const circleLeft = useTransform(springX, (x) => x - CIRCLE_D / 2);

  // Total container height: bar height + half the circle peeking above bar top
  const containerH = BAR_H + CIRCLE_D / 2;

  return (
    <div
      ref={barRef}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{ height: containerH }}
    >
      {/* ── SVG bar with U-dip ───────────────────────────────────────── */}
      <svg
        viewBox={`0 0 ${vbW} ${VB_H}`}
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: BAR_H }}
      >
        <defs>
          <filter id="nav-shadow" x="-10%" y="-50%" width="120%" height="200%">
            <feDropShadow dx="0" dy="-3" stdDeviation="6" floodColor="rgba(0,0,0,0.18)" />
          </filter>
        </defs>
        <motion.path
          d={pathD}
          fill="hsl(var(--primary))"
          filter="url(#nav-shadow)"
        />
      </svg>

      {/* ── Floating active-tab circle (sits in the dip opening) ─────── */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full"
        style={{
          width:  CIRCLE_D,
          height: CIRCLE_D,
          // Position the circle so its centre aligns with the dip bottom edge
          // The dip descends DIP_D below bar top → circle centre = bar top area
          bottom: BAR_H - DIP_D / 2 - CIRCLE_D / 2,
          left:   circleLeft,
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          boxShadow: "0 0 0 4px hsl(var(--primary)), 0 6px 20px rgba(34,197,94,0.45)",
        }}
      >
        {(() => {
          const Icon = NAV_ITEMS[resolvedIndex].icon;
          return <Icon className="h-6 w-6 text-white" strokeWidth={2.2} />;
        })()}
      </motion.div>

      {/* ── Tap targets laid over the SVG bar ────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex"
        style={{ height: BAR_H }}
      >
        {NAV_ITEMS.map((item, i) => {
          const Icon   = item.icon;
          const active = i === resolvedIndex;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-all"
              // Hide the active slot's icon (the circle covers it)
              style={{ opacity: active ? 0 : 1 }}
            >
              <Icon
                className="h-5 w-5"
                strokeWidth={1.8}
                color="rgba(255,255,255,0.72)"
              />
              <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Active tab label floating below the circle ───────────────── */}
      <motion.div
        className="absolute flex justify-center pointer-events-none"
        style={{
          bottom: 6,
          width: slotW,
          left: useTransform(springX, (x) => x - slotW / 2),
        }}
      >
        <span className="text-[10px] font-semibold text-white/90">
          {NAV_ITEMS[resolvedIndex].label}
        </span>
      </motion.div>
    </div>
  );
}
