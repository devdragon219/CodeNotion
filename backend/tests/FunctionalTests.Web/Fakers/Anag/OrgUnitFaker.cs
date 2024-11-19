using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common;
using RealGimm.Infrastructure;

namespace RealGimm.FunctionalTests.Web.Fakers.Anag;

public sealed class OrgUnitFaker : BaseSeededFaker<OrgUnit>
{
  private int _generatedOrgUnitsCount = 0;

  public required IEnumerable<Subject> Subjects { get; init; }

  public OrgUnitFaker()
  {
    CustomInstantiator(faker =>
    {
      var orgUnit = new OrgUnit();
      orgUnit.SetEntryStatus(EntryStatus.Working);
      orgUnit.SetName(faker.Random.Words());
      orgUnit.SetInternalCode($"OU{_generatedOrgUnitsCount}");
      orgUnit.SetParentSubject(faker.PickRandom(Subjects));

      return orgUnit;
    });

    FinishWith((faker, orgUnit) =>
    {
      EnsureValid(orgUnit);
      _generatedOrgUnitsCount++;
    });
  }
}
