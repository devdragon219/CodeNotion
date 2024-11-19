namespace RealGimm.FunctionalTests.Web.Extensions;

internal static class DateTimeExtensions
{
  public static DateTime WithZeroMilliseconds(this DateTime dateTime)
    => new(dateTime.Year, dateTime.Month, dateTime.Day, dateTime.Hour, dateTime.Minute, dateTime.Second, dateTime.Kind);
}
