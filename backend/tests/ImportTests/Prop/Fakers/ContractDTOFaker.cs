using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Infrastructure;
using RealGimm.Plugin.Import.Prop.Models;

namespace RealGimm.ImportTests.Prop.Fakers;

public sealed class ContractDTOFaker : BaseSeededFaker<ContractDTO>
{
  private int _generatedDtosCount = 0;

  public required IEnumerable<ManagementSubject> ManagementSubjects { get; init; }
  public required IEnumerable<BillItemType> BillItemTypes { get; init; }
  public required IEnumerable<ContractTypeDTO> ContractTypes { get; init; }

  public ContractDTOFaker()
  {
    CustomInstantiator(faker =>
    {
      var contractType = faker.PickRandom(ContractTypes);
      var signingDate = faker.Date.Past(yearsToGoBack: 2, refDate: new DateTime(2024, 01, 01));

      var contractDto = new ContractDTO
      {
        Id = (_generatedDtosCount + 1).ToString(),
        InternalCode = $"C{(contractType.IsActive ? "A" : "P")}{(_generatedDtosCount + 1).ToString().PadLeft(5, '0')}",
        Notes = faker.Lorem.Sentence(3, 2),
        InvoiceNote = faker.Lorem.Sentence(3, 2),
        ContractTypeId = contractType.InternalCode,
        ManagementSubjectId = faker.PickRandom(ManagementSubjects).InternalCode,
        IsSplitPayment = faker.Random.Bool(),
        NoticeMonths = faker.Random.Int(1, 12),
        IsSolarAligned = faker.Random.Bool(),
        CancellationMonths = faker.Random.Int(1, 12),
        IsPostponed = faker.Random.Bool(),
        IsRecoveryOldAmounts = faker.Random.Bool(),
        BaseAmountFee = faker.Random.Int(100, 200),
        BillingPeriodMonths = faker.PickRandom("1", "2", "4", "6", "12"),
        VatTypeId = faker.PickRandom("I1", "I2", "I3"),
        BillingItemId = faker.PickRandom(BillItemTypes).InternalCode,
        SigningDate = signingDate,
        StartDate = signingDate.AddDays(faker.Random.Int(1, 10)),
        ExpirationDate1 = faker.Random.Bool() ? signingDate.AddMonths(12) : null,
        ExpirationDate2 = faker.Random.Bool() ? signingDate.AddMonths(24) : null,
        BillingStartDate = signingDate.AddDays(faker.Random.Int(10, 20)),
        CancellationDate = faker.Random.Bool() ? signingDate.AddMonths(36) : null
      };

      return contractDto;
    });

    FinishWith((_, _) => _generatedDtosCount++);
  }
}
