using RealGimm.Core;
using RealGimm.SharedKernel.Interfaces;
using Xunit;

namespace RealGimm.UnitTests.Core;

public class DateTimeToolsTest
{
    [Fact]
    public void DateTimeRangedStillValid()
    {
        var newEntry = new DateOnlyRange(DateOnly.FromDateTime(DateTime.UtcNow.AddYears(-1)), null, 7);

        Assert.True(newEntry.IsStillValid());
    }

    [Fact]
    public void DateTimeRangedCheckCollision()
    {
        var entryList = new List<DateOnlyRange> {
            new(new DateOnly(2020, 1, 1), new DateOnly(2020, 6, 30), 7),
            new(new DateOnly(2020, 7, 1), new DateOnly(2020, 9, 30), 8),
            new(new DateOnly(2020, 10, 1), new DateOnly(2020, 12, 31), 9),
        };

        Assert.False(entryList.ContainsOverlaps());

        entryList.Add(new DateOnlyRange(new DateOnly(2020, 3, 1), new DateOnly(2020, 6, 30), 10));

        Assert.True(entryList.ContainsOverlaps());

        entryList.RemoveAll(de => de.Id == 10);

        entryList.Add(new DateOnlyRange(new DateOnly(2020, 3, 1), null, 10));

        Assert.True(entryList.ContainsOverlaps());
    }

    [Fact]
    public void CheckCollision()
    {
        var srcList = new List<DateRange>();

        var newEntry = new DateRange(DateTime.UtcNow, DateTime.UtcNow.AddMinutes(1), 7);

        //Can insert into empty list
        Assert.True(DateTimeTools.CanInsert(srcList, newEntry));

        srcList.Add(newEntry);

        //Cannot insert twice the same element, but can update
        Assert.False(DateTimeTools.CanInsert(srcList, newEntry));
        Assert.True(DateTimeTools.CanUpdate(srcList, newEntry));

        //Cannot insert when overlapping
        newEntry = new DateRange(DateTime.UtcNow.AddMinutes(-5), DateTime.UtcNow.AddMinutes(5), 17);

        Assert.False(DateTimeTools.CanInsert(srcList, newEntry));
        Assert.False(DateTimeTools.CanUpdate(srcList, newEntry));

        //Can insert when not overlapping
        newEntry = new DateRange(DateTime.UtcNow.AddMinutes(-5), DateTime.UtcNow.AddMinutes(-4), 17);

        Assert.True(DateTimeTools.CanInsert(srcList, newEntry));
        Assert.True(DateTimeTools.CanUpdate(srcList, newEntry));

        srcList.Add(newEntry);

        //Cannot add unbound in the past
        newEntry = new DateRange(DateTime.UtcNow.AddMinutes(-15), null, 27);

        Assert.False(DateTimeTools.CanInsert(srcList, newEntry));
        Assert.False(DateTimeTools.CanUpdate(srcList, newEntry));

        //Can add unbound in the future
        newEntry = new DateRange(DateTime.UtcNow.AddMinutes(15), null, 27);

        Assert.True(DateTimeTools.CanInsert(srcList, newEntry));
        Assert.True(DateTimeTools.CanUpdate(srcList, newEntry));

        srcList.Add(newEntry);

        //Can't add anymore in the future
        newEntry = new DateRange(DateTime.UtcNow.AddMinutes(35), null, 37);

        Assert.False(DateTimeTools.CanInsert(srcList, newEntry));
        Assert.False(DateTimeTools.CanUpdate(srcList, newEntry));

        //Could edit the unbound future
        newEntry = new DateRange(DateTime.UtcNow.AddMinutes(35), null, 27);

        Assert.False(DateTimeTools.CanInsert(srcList, newEntry));
        Assert.True(DateTimeTools.CanUpdate(srcList, newEntry));
    }

    private record DateRange(DateTime? Since, DateTime? Until, int Id) : IDateTimeRanged, IIdentifiable;
    private record DateOnlyRange(DateOnly? Since, DateOnly? Until, int Id) : IDateOnlyRanged, IIdentifiable;
}
