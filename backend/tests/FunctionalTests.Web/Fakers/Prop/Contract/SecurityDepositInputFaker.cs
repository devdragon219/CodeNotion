using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Web.Prop.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop.Contract;

public sealed class SecurityDepositInputFaker : BaseSeededFaker<SecurityDepositInput>
{
  public required IDictionary<int, IEnumerable<int>> SubjectsWithBankAccounts { get; init; }

  public SecurityDepositInputFaker()
  {
    CustomInstantiator(faker =>
    {
      var data = SecurityDepositFaker.GenerateData(faker, SubjectsWithBankAccounts!);

      var input = new SecurityDepositInput
      {
        SubjectId = data.SubjectId,
        Since = data.Since,
        Until = data.Until,
        Type = data.Type,
        InterestCalculationStartDate = data.InterestCalculationStartDate,
        TakeoverDate = data.TakeoverDate,
        IsInterestCalculated = data.InterestCalculationStartDate.HasValue,
        IsSuretyRenewable = data.IsSuretyRenewable,
        SuretySubjectId = data.SuretySubjectId,
        BaseAmount = SecurityDepositFaker.GenerateBaseAmount(faker),
        Notes = SecurityDepositFaker.GenerateNotes(faker)
      };

      return input;
    });
  }
}
