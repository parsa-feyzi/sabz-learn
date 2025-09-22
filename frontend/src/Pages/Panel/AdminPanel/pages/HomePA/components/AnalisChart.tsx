import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

const AnalisChart = ({ data }: {data: { name: string; income: number }[]}) => {
  return (
    <ResponsiveContainer width="100%" aspect={3.5}>
      <AreaChart
        throttleDelay={200}
        className="font-[iransansdnfanum]"
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <CartesianGrid stroke="#66886670" strokeDasharray="1 1" />
        <Area
          animationDuration={0}
          className="chart_line"
          type="monotone"
          dataKey="income"
          stroke="#00b663"
          fill="#00b6631a"
          strokeWidth={2}
        />
        <XAxis dataKey="name" />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AnalisChart;
