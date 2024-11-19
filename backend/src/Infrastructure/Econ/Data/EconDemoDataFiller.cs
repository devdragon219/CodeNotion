using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Econ.Data.Fakers;
using RealGimm.SharedKernel;

namespace RealGimm.Infrastructure.Econ.Data;

public class EconDemoDataFiller : DemoDataFillerBase<EconDbContext, EconDemoDataFiller>
{
  private readonly AnagDbContext _anagContext;
  
  public override int ExecutionOrder => 50;

  public EconDemoDataFiller(EconDbContext context, AnagDbContext anagContext, ILogger<EconDemoDataFiller> logger)
    : base(context, logger)
  {
    _anagContext = anagContext;
  }

  public override async Task FillAsync(bool shortData, CancellationToken cancellationToken)
  {
    await FillTaxCreditsAsync(shortData ? 50 : 100, cancellationToken);
  }

  private async Task FillTaxCreditsAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var managementSubjects = await _anagContext.Subjects
      .OfType<ManagementSubject>()
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToListAsync(cancellationToken);

    var faker = new TaxCreditFaker
    {
      ManagementSubjects = managementSubjects
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }
}
