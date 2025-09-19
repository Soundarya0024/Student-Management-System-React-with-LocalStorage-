import React from "react"; // React library for building user interfaces
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"; // Recharts components for creating bar charts

export default function YearBarChart({ students = [] }) {
  const counts = {};

  students.forEach((s) => { // Count students per year
    const y = s.year || "Unknown"; // Handle missing year
    counts[y] = (counts[y] || 0) + 1;
  });

  const data = Object.keys(counts) 
    .sort()   // Sort years
    .map((year) => ({ year, count: counts[year] })); // Transform to array of objects

  console.log("Chart Data:", data); // 🔍 check in console

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          {/* Add a fill color */}
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
