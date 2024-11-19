using Bogus;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Infrastructure;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Fclt;

public sealed class WorkTeamInputFaker : BaseSeededFaker<WorkTeamInput>
{
  private int _generatedInputsCount = 0;

  public required Func<DateOnly, Faker<WorkerInput>> WorkerInputFakerFactory { get; init; }
  public required IEnumerable<Subject> Subjects { get; init; }
  public required IEnumerable<User> Users { get; init; }

  public WorkTeamInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var insertionDate = faker.Date.SoonDateOnly(100, refDate: new DateOnly(2023, 01, 01));
      var workerInputFaker = WorkerInputFakerFactory!(insertionDate);
      var workerInputs = workerInputFaker.GenerateBetween(1, 5).ToArray();

      var input = new WorkTeamInput
      {
        InternalCode = $"SQ{(_generatedInputsCount + 1).ToString().PadLeft(2, '0')}",
        Description = faker.Lorem.Sentence(wordCount: 2),
        ProviderSubjectId = faker.PickRandom(Subjects).Id,
        LeaderUserId = faker.PickRandom(Users).Id,
        InsertionDate = insertionDate,
        Workers = workerInputs
      };

      return input;
    });

    FinishWith((_, input) => _generatedInputsCount++);
  }
}
