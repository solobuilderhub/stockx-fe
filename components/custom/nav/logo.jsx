// components/navbar/logo.jsx
"use client";
import Link from "next/link";

export function Logo({ className }) {
  return (
    <Link href="/" className={`flex items-center ${className || ""}`}>
      <span className="text-2xl font-serif font-bold text-primary">
        Hala<span className="text-halaeats-800">Eats</span>
      </span>
    </Link>
  );
}
