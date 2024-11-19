using RealGimm.Core.Shared;
using Xunit;

namespace RealGimm.UnitTests.Core.SubjectAggregate;
public class TaxIdCheckTests
{
  [Fact]
  public void CheckTaxId_valid()
  {
    var check = new CheckItalianTaxID().Check(
      "Ignazio Antonio",
      "Damerini",
      "M",
      new DateOnly(1943,9,1),
      "B154",
      "DMRGZN43P01B154V");

      Assert.True(check);
  }

  [Fact]
  public void CheckTaxId_invalid()
  {
    var check = new CheckItalianTaxID().Check(
      "Ulisse",
      "Commisso",
      "F",
      new DateOnly(1976, 11, 1),
      "E789",
      "CMMLSS76T01E789H");

    Assert.False(check);
  }
}
