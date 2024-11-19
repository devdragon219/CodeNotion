using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class WorkerFaker : BaseSeededFaker<Worker>
{
  public required DateOnly MinSinceDate { get; init; }
  public required IEnumerable<Craft> Crafts { get; init; }
  public required IEnumerable<QualificationLevel> QualificationLevels { get; init; }

  public WorkerFaker()
  {
    CustomInstantiator(faker =>
    {
      var worker = new Worker();
      worker.SetFirstName(faker.Name.FirstName());
      worker.SetLastName(faker.Name.LastName());
      worker.SetSince(faker.Date.SoonDateOnly(50, MinSinceDate));
      worker.SetUntil(faker.Random.Bool() ? null : faker.Date.SoonDateOnly(50, worker.Since));
      worker.SetCraft(faker.PickRandom(Crafts));
      worker.SetQualificationLevel(faker.PickRandom(QualificationLevels));

      return worker;
    });

    FinishWith((_, worker) => EnsureValid(worker));
  }
}
