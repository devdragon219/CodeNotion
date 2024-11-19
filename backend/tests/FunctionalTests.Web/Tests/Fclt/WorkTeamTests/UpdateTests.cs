using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate.Specifications;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.FunctionalTests.Web.Fakers.IAM;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.WorkTeamTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : BaseUpdateWithIdParameterTests<WorkTeam, WorkTeamInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.WorkTeamFragment();
  public override ISpecification<WorkTeam>[] AdditionalSpecifications => [new WorkTeamIncludeAllSpec()];

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<(WorkTeam EntityToUpdate, WorkTeamInput Input)> ArrangeAsync(
    IServiceProvider scopedServices)
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

    var workTeamFaker = new WorkTeamFaker
    {
      Subjects = managementSubjects,
      Users = users,
      WorkerFakerFactory = date => new WorkerFaker
      {
        MinSinceDate = date,
        Crafts = crafts,
        QualificationLevels = qualificationLevels
      }
    };

    var workTeamToUpdate = await scopedServices
      .GetRequiredService<IRepository<WorkTeam>>()
      .AddAsync(workTeamFaker.Generate());

    var inputFaker = new WorkTeamInputFaker
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

    var input = inputFaker.Generate();

    return (workTeamToUpdate, input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    WorkTeamInput input,
    WorkTeam updatedEntity)
  {
    AssertHelper.Fclt.WorkTeamEqual(input, updatedEntity);
    return Task.CompletedTask;
  }
}
