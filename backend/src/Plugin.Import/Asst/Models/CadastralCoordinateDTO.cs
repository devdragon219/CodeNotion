using RealGimm.Core.Asst.CadastralUnitAggregate;

namespace RealGimm.Plugin.Import.Asst.Models;

public class CadastralCoordinateDTO
{
  public string Id { get; set; } = default!;
  public string CadastralUnitId { get; set; } = default!;
  public int Ordering { get; set; }
  public string? ITA_Sezione { get; set; }
  public string? ITA_Foglio { get; set; }
  public string? ITA_Particella { get; set; }
  public string? ITA_Subalterno { get; set; }
  public string? ITA_TavPartita { get; set; }
  public string? ITA_TavCorpo { get; set; }
  public string? ITA_TavPorzione { get; set; }
  public bool ITA_IsTavolare { get; set; }
  public string? Notes { get; set; }

  public bool IsSameCoordinates(CadastralCoordinates cc)
  {
    if (cc.CoordinateType != CoordinateType.ItalianOrdinary)
    {
      return false;
    }

    if (ITA_IsTavolare ^ cc.HasITTavData)
    {
      return false;
    }

    return $"{ITA_Sezione}/{ITA_Foglio}/{ITA_Particella}/{ITA_Subalterno}/{ITA_TavPartita}/{ITA_TavCorpo}/{ITA_TavPorzione}"
      == $"{cc.Level1}/{cc.Level2}/{cc.Level3}/{cc.Level4}/{cc.ITTavPartita}/{cc.ITTavCorpo}/{cc.ITTavPorzione}";
  }

}
