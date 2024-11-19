using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class WorkerInputFaker : BaseSeededFaker<WorkerInput>
{
  public required DateOnly MinSinceDate { get; init; }
  public required IEnumerable<int> CraftIds { get; init; }
  public required IEnumerable<int> QualificationLevelIds { get; init; }

  public WorkerInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var since = faker.Date.SoonDateOnly(50, MinSinceDate);
      var until = faker.Random.Bool() ? (DateOnly?)null : faker.Date.SoonDateOnly(50, since);

      var input = new WorkerInput
      {
        FirstName = faker.Name.FirstName(),
        LastName = faker.Name.LastName(),
        Since = since,
        Until = until,
        CraftId = faker.PickRandom(CraftIds),
        QualificationLevelId = faker.PickRandom(QualificationLevelIds)
      };

      return input;
    });
  }
}
