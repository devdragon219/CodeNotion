using Bogus;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class WorkTeamFaker : BaseSeededFaker<WorkTeam>
{
  private int _generatedObjectsCount = 0;

  public required Func<DateOnly, Faker<Worker>> WorkerFakerFactory { get; init; }
  public required IEnumerable<Subject> Subjects { get; init; }
  public required IEnumerable<User> Users { get; init; }

  public WorkTeamFaker()
  {
    CustomInstantiator(faker =>
    {
      var workTeam = new WorkTeam();
      workTeam.SetInternalCode($"SQ{(_generatedObjectsCount + 1).ToString().PadLeft(2, '0')}");
      workTeam.SetDescription(faker.Lorem.Sentence(wordCount: 2));
      workTeam.SetProviderSubjectId(faker.PickRandom(Subjects).Id);
      workTeam.SetLeaderUserId(faker.PickRandom(Users).Id);
      workTeam.SetInsertionDate(faker.Date.SoonDateOnly(100, refDate: new DateOnly(2023, 01, 01)));

      var workerFaker = WorkerFakerFactory!(workTeam.InsertionDate);
      workTeam.Workers.AddRange(workerFaker.GenerateBetween(1, 5));

      return workTeam;
    });

    FinishWith((_, workTeam) =>
    {
      EnsureValid(workTeam);
      _generatedObjectsCount++;
    });
  }
}
