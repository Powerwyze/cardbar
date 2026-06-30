"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";

const TAP_DATA = [
  { day: "Mon", taps: 12 },
  { day: "Tue", taps: 19 },
  { day: "Wed", taps: 28 },
  { day: "Thu", taps: 22 },
  { day: "Fri", taps: 35 },
  { day: "Sat", taps: 8 },
  { day: "Sun", taps: 5 },
];

const LEAD_DATA = [
  { week: "W1", leads: 5 },
  { week: "W2", leads: 8 },
  { week: "W3", leads: 12 },
  { week: "W4", leads: 9 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassPanel className="p-6">
          <h3 className="font-serif text-lg text-bar-cream mb-4">Taps This Week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={TAP_DATA}>
              <XAxis dataKey="day" stroke="#3D3D42" fontSize={12} />
              <YAxis stroke="#3D3D42" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#1A1A1D", border: "1px solid #C9A96233", borderRadius: 8 }}
                labelStyle={{ color: "#F5F0E8" }}
              />
              <Bar dataKey="taps" fill="#C9A962" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h3 className="font-serif text-lg text-bar-cream mb-4">Leads Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={LEAD_DATA}>
              <XAxis dataKey="week" stroke="#3D3D42" fontSize={12} />
              <YAxis stroke="#3D3D42" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#1A1A1D", border: "1px solid #C9A96233", borderRadius: 8 }}
              />
              <Line type="monotone" dataKey="leads" stroke="#D4A054" strokeWidth={2} dot={{ fill: "#C9A962" }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassPanel>
      </div>

      <GlassPanel className="p-6">
        <h3 className="font-serif text-lg text-bar-cream mb-4">Top Clicked Links</h3>
        <div className="space-y-3">
          {[
            { link: "Book a Meeting", clicks: 89 },
            { link: "Save Contact", clicks: 67 },
            { link: "Portfolio", clicks: 45 },
            { link: "LinkedIn", clicks: 32 },
          ].map((item) => (
            <div key={item.link} className="flex items-center justify-between">
              <span className="text-bar-cream/70 text-sm">{item.link}</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-bar-smoke rounded-full overflow-hidden">
                  <div
                    className="h-full bg-bar-gold rounded-full"
                    style={{ width: `${(item.clicks / 89) * 100}%` }}
                  />
                </div>
                <span className="text-bar-gold text-sm w-8 text-right">{item.clicks}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
