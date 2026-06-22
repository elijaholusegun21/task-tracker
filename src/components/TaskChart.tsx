import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useTasks } from "../hooks/UseTask";

const COLORS = [
  "#22c55e",
  "#eab308",
];

const TaskChart = () => {
  const { tasks } = useTasks();

  const data = [
    {
      name: "Completed",
      value: tasks.filter(
        (task) =>
          task.status === "completed"
      ).length,
    },
    {
      name: "Pending",
      value: tasks.filter(
        (task) =>
          task.status === "pending"
      ).length,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 p-5">
      <h2 className="text-lg font-semibold mb-4">
        Task Status Overview
      </h2>

      <div className="h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {data.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskChart;