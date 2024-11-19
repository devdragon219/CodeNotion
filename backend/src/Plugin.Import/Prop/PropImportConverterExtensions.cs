using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Plugin.Import.Prop;

public static class PropImportConverterExtensions
{
  public static TermType ParseAsRG2AdminTermType(this string? value)
    => value switch
    {
      "TE1" => TermType.Generic,
      "TE2" => TermType.Heating,
      "TE3" => TermType.ExtraordinaryAsset,
      "TE4" => TermType.ExtraordinaryNonAsset,
      _ => TermType.Generic
    };

  public static SecurityDepositType ParseAsRG2SecurityDepositType(this string? value)
    => value switch
    {
      "SD1" => SecurityDepositType.Cash,
      "SD2" => SecurityDepositType.BankSurety,
      "SD3" => SecurityDepositType.BankSurety,
      "SD4" => SecurityDepositType.Cash,
      "SD5" => SecurityDepositType.InsuranceSurety,
      "SD6" => SecurityDepositType.BankAccount,
      "SD7" => SecurityDepositType.BankAccount,
      _ => SecurityDepositType.Cash
    };

  public static TakeoverType ParseAsRG2TakeoverType(this string? value)
    => value switch
    {
      "1" => TakeoverType.ita_T1Demise,
      "2" => TakeoverType.ita_T2RightsTransfer,
      "3" => TakeoverType.ita_T3CompanyTransformation,
      "4" => TakeoverType.ita_T4CompanyMerger,
      "5" => TakeoverType.ita_T5CompanySplit,
      "6" => TakeoverType.ita_T6Others,
      _ => TakeoverType.ita_T6Others
    };
}