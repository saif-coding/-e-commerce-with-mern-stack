import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 2000 },
];

function SalesChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-fit">
      <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#6366f1"
          strokeWidth={2}
        />
      </LineChart>
    </div>
  );
}

export default SalesChart;
