using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.FunctionalTests.Web.Fakers.IAM;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.WorkTeamTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : BaseAddTests<WorkTeam, WorkTeamInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.WorkTeamFragment();
  public override ISpecification<WorkTeam>[] AdditionalSpecifications => [new WorkTeamIncludeAllSpec()];

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<WorkTeamInput> ArrangeAsync(IServiceProvider scopedServices)
  {
    var managementSubjects = await scopedServices
     .GetRequiredService<IRepository<Subject>>()
     .AddRangeAsync(new ManagementSubjectFaker().Generate(2));

    var crafts = await scopedServices
      .GetRequiredService<IRepository<Craft>>()
      .AddRangeAsync(new CraftFaker().Generate(2));

    var qualificationLevels = await scopedServices
      .GetRequiredService<IRepository<QualificationLevel>>()
      .AddRangeAsync(new QualificationLevelFaker().Generate(2));

    var users = await scopedServices
      .GetRequiredService<IRepository<User>>()
      .ListAsync();

    var faker = new WorkTeamInputFaker
    {
      Subjects = managementSubjects,
      Users = users,
      WorkerInputFakerFactory = date => new WorkerInputFaker
      {
        MinSinceDate = date,
        CraftIds = crafts.Select(craft => craft.Id),
        QualificationLevelIds = qualificationLevels.Select(qualificationLevel => qualificationLevel.Id)
      }
    };

    var input = faker.Generate();

    return input;
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    WorkTeamInput input,
    WorkTeam addedEntity)
  {
    AssertHelper.Fclt.WorkTeamEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
