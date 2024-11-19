using System.Diagnostics;

namespace RealGimm.FunctionalTests.Web;

internal static partial class AssertHelper
{
  public static void Equal<T1, T2>(T1? object1, T2? object2, Action<T1, T2> assertEqual)
    where T1 : notnull
    where T2 : notnull
  {
    Debug.Assert(assertEqual is not null);

    if (object1 is null)
    {
      Assert.Null(object2);
      return;
    }

    if (object2 is null)
    {
      Assert.Null(object1);
      return;
    }

    assertEqual(object1, object2);
  }

  public static void CollectionsEqual<T1, T2>(
    IEnumerable<T1>? collection1,
    IEnumerable<T2>? collection2,
    Action<T1, T2> assertEqual)
    where T1 : notnull
    where T2 : notnull
  {
    Debug.Assert(assertEqual is not null);

    if (collection1 is null)
    {
      Assert.Null(collection2);
      return;
    }

    if (collection2 is null)
    {
      Assert.Null(collection1);
      return;
    }

    Assert.Equal(collection1.Count(), collection2.Count());

    for (int i = 0; i < collection1.Count(); i++)
    {
      assertEqual(collection1.ElementAt(i), collection2.ElementAt(i));
    }
  }
}
