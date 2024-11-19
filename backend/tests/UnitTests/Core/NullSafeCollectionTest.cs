using RealGimm.Core;
using Xunit;

namespace RealGimm.UnitTests.Core;

public class NullSafeCollectionTest
{
    [Fact]
    public void NSCCanAdd()
    {
        var nsc = new NullSafeCollection<string>();

        nsc.AddRange(new[] {
            "test",
            "test2"
        });

        Assert.Collection(nsc,
            e => { Assert.Equal("test", e); },
            e => { Assert.Equal("test2", e); }
            );
    }

    [Fact]
    public void NSCCanInsert()
    {
        var nsc = new NullSafeCollection<string>();

        nsc.AddRange(new[] {
            "test",
            "test2"
        });

        Assert.Collection(nsc,
            e => { Assert.Equal("test", e); },
            e => { Assert.Equal("test2", e); }
            );

        nsc.Insert(1, "test7");

        Assert.Collection(nsc,
            e => { Assert.Equal("test", e); },
            e => { Assert.Equal("test7", e); },
            e => { Assert.Equal("test2", e); }
            );
    }
}
