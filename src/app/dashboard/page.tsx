import ExpenseChart from "@/components/ExpenseChart";
import React from "react";

interface Transaction {
  type: string;
  category: string;
  description: string;
  amount: number;
}

function groupByCategory(transactions: Transaction[]) {
  const map: { [key: string]: number } = {};
  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      map[transaction.category] =
        (map[transaction.category] || 0) + transaction.amount;
    }
  });
  return Object.entries(map).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));
}

async function getTransactions() {
  const res = await fetch("/api/transactions", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Dashboard() {
  const transactions = await getTransactions();
  const chartData = groupByCategory(transactions);
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <ExpenseChart data={chartData} />
      </div>
    </>
  );
}
