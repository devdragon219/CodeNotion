using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Plugin.Import.Anag;

public static class AnagImportConverterExtensions
{
  public static AddressType ParseAsRG2AddressType(this string? value)
    => value switch
    {
      "TI1" => AddressType.Fiscal,
      "TI2" => AddressType.Mailing,
      "TI3" => AddressType.LegalResidential,
      _ => AddressType.LegalResidential
    };
}