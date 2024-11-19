using RealGimm.SharedKernel;
using Xunit;

namespace RealGimm.UnitTests.SharedKernel;

public class NullableComparerTest
{
    [Fact]
    public void CheckStrings()
    {
      string? str1 = null;
      string? str2 = Guid.NewGuid().ToString();

      Assert.False(NullableComparer.Equals(str1, str2));

      Assert.True(NullableComparer.Equals(str1, null));

      Assert.True(NullableComparer.Equals(str2, str2));

      Assert.False(NullableComparer.Equals(Guid.NewGuid().ToString(), str2));
    }

    [Fact]
    public void CheckDates()
    {
      DateTime? dt1 = null;
      DateTime? dt2 = DateTime.UtcNow;

      Assert.False(NullableComparer.Equals(dt1, dt2));

      Assert.True(NullableComparer.Equals(dt1, null));

      Assert.True(NullableComparer.Equals(dt2, dt2));

      Assert.False(NullableComparer.Equals(DateTime.UtcNow.AddMinutes(1), dt2));
    }
}