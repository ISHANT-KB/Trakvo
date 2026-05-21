"use client";
import { PieChart, Pie } from "recharts";

export default function ExpenseChart({data}: {data: Array<{name: string; value: number}>}) {
    return(
        <PieChart width={400} height={400}>
            <Pie data={data} outerRadius={150} fill="#8884d8"
                dataKey="value"
            />
        </PieChart>
    )
}