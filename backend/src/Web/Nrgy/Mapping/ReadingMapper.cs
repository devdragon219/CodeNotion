using RealGimm.Web.Nrgy.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.WebCommons.Extensions;
using RealGimm.Core.Nrgy.ReadingAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Web.Nrgy.Mapping;

public sealed class ReadingMapper : IMapper<ReadingInput, Reading>
{
  private readonly IMapper _mapper;
  private readonly IReadRepository<UtilityService> _utilityServiceRepository;

  public ReadingMapper(IMapper mapper, IReadRepository<UtilityService> utilityServiceRepository)
  {
    _mapper = mapper;
    _utilityServiceRepository = utilityServiceRepository;
  }

  public async Task<Reading?> MapAsync(ReadingInput? from, Reading? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var reading = into ?? new Reading();
    reading.SetData(from.ReadingTimestamp, from.IsEstimated, from.Notes);

    var utilityService = await _utilityServiceRepository
      .AsQueryable(new GetByIdSpec<UtilityService>(from.UtilityServiceId))
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.ReadingNonExistingUtilityService.ToValidationError());

    reading.SetService(utilityService);

    await _mapper.UpdateCollectionAsync(from.Values, reading.Values, cancellationToken);

    return reading;
  }
}
