using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.Services;
public class EstateSubUnitCodeSuggestionService : ICodeSuggestor<EstateSubUnit>
{
  private readonly IReadRepository<EstateUnit> _repoEstateUnit;
  private readonly IReadRepository<EstateSubUnit> _repoEstateSubUnit;

  public EstateSubUnitCodeSuggestionService(
    IReadRepository<EstateUnit> repoEstateUnit,
    IReadRepository<EstateSubUnit> repoEstateSubUnit)
  {
    _repoEstateUnit = repoEstateUnit;
    _repoEstateSubUnit = repoEstateSubUnit;
  }

  public async Task<string?> SuggestNextCode(int? parentId, EstateSubUnit? partialEntity, string[]? additionallyOccupiedCodes)
  {
    ArgumentNullException.ThrowIfNull(parentId);

    var parent = await _repoEstateUnit.FirstOrDefaultAsync(new GetByIdSpec<EstateUnit>(parentId!.Value))
      ?? throw new ArgumentException("Invalid parentId");

    var subUnits = _repoEstateSubUnit
      .AsQueryable(new EstateSubUnitByParentIdSpec(parentId!.Value))
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToList();

    var maxCode = subUnits.Select(e => e.InternalCode).DefaultIfEmpty().Max();

    var actualNumber = string.IsNullOrEmpty(maxCode)
      ? 0
      : !Regex.IsMatch(maxCode, "\\d+$")
        ? 0
        : Convert.ToInt32(Regex.Match(maxCode, "\\d+$").Value);

    var parentCode = parent.InternalCode ?? string.Empty;
    var proposedCode = parentCode + "SU" + actualNumber.ToString().PadLeft(3, '0');

    while ((additionallyOccupiedCodes != null && additionallyOccupiedCodes.Contains(proposedCode)) ||
      subUnits.Any(eu => eu.InternalCode == proposedCode))
    {
      actualNumber++;
      proposedCode = parentCode + "SU" + actualNumber.ToString().PadLeft(3, '0');
    }

    return proposedCode;
  }

  public Task<string> SuggestNextCode(int? parentId, string[] additionallyOccupiedCodes) => throw new NotImplementedException();
  public Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes) => throw new NotImplementedException();

  public string SuggestNextCode(string parentCode) => throw new NotImplementedException();
}
