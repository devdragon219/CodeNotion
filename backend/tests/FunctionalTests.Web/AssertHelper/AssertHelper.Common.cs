using RealGimm.Web.Asst.Models;
using RealGimm.Core.Common.OfficialActAggregate;
using RealGimm.Web.Common.Models;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.FunctionalTests.Web;

internal static partial class AssertHelper
{
  public static class Common
  {
    public static void OfficialActEqual(EstateUnitOfficialActInput input, OfficialAct officialAct)
    {
      Assert.Equal(input.ProtocolNumber, officialAct.ProtocolNumber);

      Assert.Equal(
        input.RepertoireNumber,
        officialAct.ActRegistrationFields.Single(x => x.FieldType == RegistrationFieldType.IT_REPERTOIRE_NUMBER).Value);

      Assert.Equal(input.RegistrationNumber, officialAct.RegistrationNumber);
      Assert.Equal(input.RegistrationDate, officialAct.RegistrationDate);

      Assert.Equal(
        input.WrittenAtCity,
        officialAct.ActRegistrationFields.Single(x => x.FieldType == RegistrationFieldType.IT_WRITTEN_AT_CITY).Value);

      Assert.Equal(
        input.TranscriptionNumber,
        officialAct.ActRegistrationFields.Single(x => x.FieldType == RegistrationFieldType.IT_TRANSCRIPTION_NUMBER).Value);

      Assert.Equal(
        input.TranscriptionDate,
        officialAct.ActRegistrationDates.SingleOrDefault(x => x.DateType == RegistrationDateType.IT_TRANSCRIPTION_DATE)?.Value);

      Assert.Equal(
        input.TranscriptionCity,
        officialAct.ActRegistrationFields.Single(x => x.FieldType == RegistrationFieldType.IT_TRANSCRIPTION_CITY).Value);

      Assert.Equal(
        input.NotaryActDate,
        officialAct.ActRegistrationDates.Single(x => x.DateType == RegistrationDateType.IT_NOTARY_ACT_DATE).Value);

      Assert.Equal(
        input.CollectionNumber,
        officialAct.ActRegistrationFields.Single(x => x.FieldType == RegistrationFieldType.IT_COLLECTION_NUMBER).Value);

      Assert.Equal(input.NotaryName, officialAct.IssuerName);
    }

    public static void VATRateEqual(VATRateInput input, VATRate vatRate)
    {
      if (input.Id is not null)
      {
        Assert.Equal(input.Id, vatRate.Id);
      }

      Assert.Equal(input.Description, vatRate.Description);
      Assert.Equal(input.InternalCode, vatRate.InternalCode);
      Assert.Equal(input.Type, vatRate.Type);
      Assert.Equal(input.RatePercent, vatRate.RatePercent);
    }

    public static void InterestRateEqual(InterestRateInput input, InterestRate interestRate)
    {
      if (input.Id is not null)
      {
        Assert.Equal(input.Id, interestRate.Id);
      }

      Assert.Equal(input.Rate, interestRate.Rate);
      Assert.Equal(input.Since, interestRate.Since);
      Assert.Equal(input.Until, interestRate.Until);
    }

    public static void BillItemTypeEqual(BillItemTypeInput input, BillItemType billItemType)
    {
      if (input.Id is not null)
      {
        Assert.Equal(input.Id, billItemType.Id);
      }

      Assert.Equal(input.Description, billItemType.Description);
      Assert.Equal(input.IsForAdministration, billItemType.IsForAdministration);
      Assert.Equal(input.IsForContractFee, billItemType.IsForContractFee);
      Assert.Equal(input.IsForContractCosts, billItemType.IsForContractCosts);
      Assert.Equal(input.IsPositive, billItemType.IsPositive);
    }

    public static void AccountingItemEqual(AccountingItemInput input, AccountingItem accountingItem)
    {
      if (input.Id is not null)
      {
        Assert.Equal(input.Id, accountingItem.Id);
      }

      Assert.Equal(input.Description, accountingItem.Description);
      Assert.Equal(input.ExternalCode, accountingItem.ExternalCode);
      Assert.Equal(input.InternalCode, accountingItem.InternalCode);
    }
  }
}
