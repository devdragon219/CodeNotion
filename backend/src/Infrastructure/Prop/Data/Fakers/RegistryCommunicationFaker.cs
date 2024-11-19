using Bogus;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class RegistryCommunicationFaker : BaseSeededFaker<RegistryCommunication>
{
  public required IEnumerable<Contract> Contracts { get; init; }
  public required IEnumerable<ManagementSubject> ManagementSubjects { get; init; }
  public required IEnumerable<PhysicalSubject> LegalRepresentativeSubjects { get; init; }
  public required IEnumerable<EstateUnit> EstateUnits { get; init; }

  public RegistryCommunicationFaker()
  {
    CustomInstantiator(faker =>
    {
      var contractsWithregistrationTaxData = Contracts!.Where(contract => contract.RegistrationTaxData is not null);
      var contract = faker.PickRandom(contractsWithregistrationTaxData.Any() ? contractsWithregistrationTaxData : Contracts);
      var managementSubject = ManagementSubjects!.Single(subject => subject.Id == contract.ManagementSubjectId);

      var communication = new RegistryCommunication();
      communication.SetContract(contract);

      communication.SetDate(contract.SecondTermExpirationDate.HasValue
        ? faker.Date.BetweenDateOnly(contract.EffectStartDate, contract.SecondTermExpirationDate.Value)
        : faker.Date.FutureDateOnly(refDate: contract.EffectStartDate));

      communication.SetCountryISO3(faker.RgCountryCode());
      communication.SetOffice(contract.RegistrationTaxData?.RegistrationOffice);
      communication.SetType(faker.PickRandom<CommunicationType>());
      communication.SetRegistryNumber(faker.Random.AlphaNumeric(10).ToUpper());
      communication.SetDebtAmount(decimal.Round(faker.Random.Decimal(max: 10_000), 2));
      communication.SetSenderSubjectId(managementSubject.Id);
      communication.SetRequestingSubjectId(managementSubject.Id);
      communication.SetContractCode(faker.Random.AlphaNumeric(10).ToUpper());
      communication.SetContractType(faker.PickRandom("L1", "L2", "L3", "L4", "S1", "S2", "S3", "T1", "T2", "T3", "T4"));
      communication.SetStartDate(contract.EffectStartDate);
      communication.SetEndDate(contract.SecondTermExpirationDate);
      communication.SetContractFee(decimal.Round(faker.Random.Decimal(max: 1000m), 2));
      communication.SetIsPayingEntireContractFee(faker.Random.Bool());
      communication.SetRegistryFee(decimal.Round(faker.Random.Decimal(max: 1000m), 2));
      communication.SetStampFee(decimal.Round(faker.Random.Decimal(max: 1000m), 2));
      communication.SetRegistryFeePenalty(decimal.Round(faker.Random.Decimal(max: 100m), 2));
      communication.SetStampFeePenalty(decimal.Round(faker.Random.Decimal(max: 100m), 2));
      communication.SetRegistryFeeInterest(decimal.Round(faker.Random.Decimal(max: 100m), 2));
      communication.SetStampFeeInterest(decimal.Round(faker.Random.Decimal(max: 100m), 2));
      communication.SetContractSignatureDate(contract.AgreementDate);
      communication.SetNumberOfPages(faker.Random.Int(1, 50));
      communication.SetNumberOfCopies(faker.Random.Int(1, 5));

      if (faker.Random.Bool())
      {
        var legalRepresentativeId = faker.PickRandom(LegalRepresentativeSubjects!.Where(subject => subject.BirthSex.HasValue)).Id;
        communication.Confirm(communication.Date, legalRepresentativeId, managementSubject.BankAccounts.First().Id);
      }

      if (faker.Random.Bool())
      {
        for (int i = 0; i < faker.Random.Int(1, 2); i++)
        {
          var anomaly = new RegistryCommunicationAnomaly();
          anomaly.SetDescription(faker.Lorem.Sentence());

          communication.Anomalies.Add(anomaly);
        }
      }

      for (int i = 0; i < contract.LocatedUnits.Count; i++)
      {
        var locatedUnit = contract.LocatedUnits[i];
        var estateUnit = EstateUnits!.Single(unit => unit.Id == locatedUnit.EstateUnitId);

        var commEstateUnit = new CommEstateUnit();
        commEstateUnit.SetCommunicationIndex(i + 1);
        commEstateUnit.SetEstateUnitId(locatedUnit.EstateUnitId);
        commEstateUnit.SetEstateUnitType(estateUnit.Type.ToString());
        commEstateUnit.SetCadastreType($"T{faker.Random.Int(1, 5)}");
        commEstateUnit.SetEstatePartition(faker.Random.Bool() ? "P" : "I");

        commEstateUnit.SetCadastralCoordinates(
          faker.Random.AlphaNumeric(10),
          faker.Random.AlphaNumeric(10),
          faker.Random.AlphaNumeric(10),
          faker.Random.AlphaNumeric(10));

        commEstateUnit.SetCadastralCategory($"{faker.Random.Char('A', 'F')}{faker.Random.Int(1, 5):00}");
        commEstateUnit.SetCadastralAddressToponymy(faker.Address.StreetAddress());
        commEstateUnit.SetCadastralAddressNumbering(faker.Address.BuildingNumber());
        commEstateUnit.SetCadastralIncome(decimal.Round(faker.Random.Decimal(500, 5000), 2));

        communication.EstatesUnits.Add(commEstateUnit);
      }

      return communication;
    });
  }

}
