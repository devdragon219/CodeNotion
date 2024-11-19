export const getChartYAxisProps = (maxValue: number): ApexYAxis => {
  return {
    min: 0,
    stepSize: maxValue < 10 ? 1 : maxValue < 100 ? 10 : 50,
    tickAmount:
      maxValue < 10
        ? maxValue + 1
        : maxValue < 100
          ? Math.floor((maxValue + 10) / 10)
          : Math.floor((maxValue + 50) / 50),
  };
};
