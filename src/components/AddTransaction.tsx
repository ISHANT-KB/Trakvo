"use client";
import { useState } from "react";

export default function AddTransaction() {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    note: "",
  });

  // Fix 1: typed 'e' as React.FormEvent — resolves implicit 'any' ts(7006)
  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(form),
    });
    alert("Transaction added!");
  };

  // Fix 2 & 3: return ( was never closed with ')' — added missing paren
  // Fix 4: component was closed with '});' instead of ');' + '}'
  return (
    <form onSubmit={HandleSubmit} className="space-y-2">
      <input className="border m-1"
        placeholder="Amount"
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <input className="border m-1"
        placeholder="Category"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-1.12"
      >
        Add
      </button>
    </form>
  );
}
