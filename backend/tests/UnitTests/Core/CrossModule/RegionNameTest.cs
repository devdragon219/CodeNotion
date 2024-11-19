using RealGimm.Core.CrossModule;
using Xunit;

namespace RealGimm.UnitTests.Core.CrossModule;

public class RegionNameTest
{
    [Fact]
    public void CheckCases()
    {
        Assert.Equal("Italia", RegionData.RegionNameFromISO("ita"));
        Assert.Equal("Italia", RegionData.RegionNameFromISO("ITA"));
        Assert.Equal("France", RegionData.RegionNameFromISO("fra"));
        Assert.Equal("Österreich", RegionData.RegionNameFromISO("aut"));
        Assert.Null(RegionData.RegionNameFromISO(null));
        Assert.Null(RegionData.RegionNameFromISO(""));
        Assert.Null(RegionData.RegionNameFromISO("aaaaaaaa"));
    }
}
