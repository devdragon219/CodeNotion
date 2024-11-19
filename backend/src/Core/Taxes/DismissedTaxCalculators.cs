namespace RealGimm.Core.Taxes;

public static class DismissedTaxCalculators
{
  public static readonly Guid ITA_ICI = new("cdb0be42-71dc-4602-a694-e72ca11e93cb");
  public static readonly Guid ITA_TASI = new("8705eb04-3f11-4fc6-845d-0cc995b67765");

  public static readonly Dictionary<Guid, string> Names = new() {
    {ITA_ICI, "ICI"},
    {ITA_TASI, "TASI"},
  };
}