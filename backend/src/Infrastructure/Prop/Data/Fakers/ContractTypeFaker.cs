using Bogus;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.ContractTypeAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class ContractTypeFaker : BaseSeededFaker<ContractType>
{
  private int _generatedContractTypesCount = 0;

  public required IEnumerable<EstateUsageType> UsageTypes { get; init; }

  public ContractTypeFaker()
  {
    CustomInstantiator(faker =>
    {
      var contractType = new ContractType();
      contractType.SetDescription(GenerateDescription(faker));
      contractType.SetInternalCode(GenerateInternalCode(number: _generatedContractTypesCount + 1));
      contractType.SetIsActive(GenerateIsActive(faker));
      contractType.SetIsStampTax(GenerateIsStampTax(faker));
      contractType.SetIsRegistrationTax(GenerateIsRegistrationTax(faker));
      contractType.SetNature(PickNature(faker));
      contractType.SetUsageType(faker.PickRandom(UsageTypes).Id);
      contractType.SetIsRentChargeApplicable(GenerateIsRentChargeApplicable(faker));
      contractType.SetIsAbsoluteRevaluation(GenerateIsAbsoluteRevaluation(faker));
      contractType.SetIsRevaluationApplicable(GenerateIsRevaluationApplicable(faker));
      contractType.SetRevaluationRatePercent(GenerateRevaluationRatePercent(faker));
      contractType.SetRevaluationCalculationMonth(GenerateRevaluationCalculationMonth(faker));
      contractType.SetRevaluationIndexMonth(GenerateRevaluationIndexMonth(faker));
      contractType.SetRegistrationTaxPercent(GenerateRegistrationTaxPercent(faker));
      contractType.SetRegistrationTaxTenantPercent(GenerateRegistrationTaxTenantPercent(faker));
      contractType.SetRegistrationTaxIncomeType(PickRegistrationTaxIncomeType(faker));

      return contractType;
    });

    FinishWith((_, contractType) =>
    {
      var validationErrors = contractType.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(ContractType)} entity! Errors: {errorMessages}");
      }

      _generatedContractTypesCount++;
    });
  }

  public static string? GenerateDescription(Faker faker) => faker.Lorem.Sentence(10, 3);
  
  public static string GenerateInternalCode(int number) => $"CT{number.ToString().PadLeft(5, '0')}";
  
  public static bool GenerateIsActive(Faker faker) => faker.Random.Bool();
  
  public static bool GenerateIsStampTax(Faker faker) => faker.Random.Bool();
  
  public static bool GenerateIsRegistrationTax(Faker faker) => faker.Random.Bool();
  
  public static AssetNature PickNature(Faker faker) => faker.PickRandom<AssetNature>();

  public static bool GenerateIsRentChargeApplicable(Faker faker) => faker.Random.Bool();
  
  public static bool GenerateIsAbsoluteRevaluation(Faker faker) => faker.Random.Bool();
  
  public static bool GenerateIsRevaluationApplicable(Faker faker) => faker.Random.Bool();
  
  public static decimal? GenerateRevaluationRatePercent(Faker faker)
    => faker.Random.Bool()
      ? decimal.Round(faker.Random.Decimal(0.01m, 100m), 2)
      : null;
  
  public static int? GenerateRevaluationCalculationMonth(Faker faker)
    => faker.Random.Bool()
      ? faker.Random.Int(1, 12)
      : null;
  
  public static int? GenerateRevaluationIndexMonth(Faker faker)
    => faker.Random.Bool()
      ? faker.Random.Int(1, 12)
      : null;
  
  public static double? GenerateRegistrationTaxPercent(Faker faker)
    => faker.Random.Bool()
      ? double.Round(faker.Random.Double(0.01, 100), 2)
      : null;
  
  public static double? GenerateRegistrationTaxTenantPercent(Faker faker)
    => faker.Random.Bool()
      ? double.Round(faker.Random.Double(0.01, 100), 2)
      : null;
  
  public static RegistrationTaxIncomeTypeRLI PickRegistrationTaxIncomeType(Faker faker)
    => faker.PickRandom<RegistrationTaxIncomeTypeRLI>();
}
