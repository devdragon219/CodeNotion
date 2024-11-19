namespace RealGimm.Core.Shared.Charts;

public interface ILineChartDataPoint<TSelf>
  where TSelf : ILineChartDataPoint<TSelf>
{
  public static abstract TSelf Zero { get; }

  public static abstract TSelf operator +(TSelf left, TSelf right);
}
