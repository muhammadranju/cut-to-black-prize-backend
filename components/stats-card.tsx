import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { NumberTicker } from "./ui/number-ticker";

export const StatsCard = ({
  title,
  value = 10,
  icon,
}: {
  title: string;
  value: number;
  icon?: any;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <NumberTicker
          className="text-2xl font-bold text-white"
          value={value || 100}
        />
      </CardContent>
    </Card>
  );
};
