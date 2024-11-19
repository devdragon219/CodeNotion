using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.Services;

public class EstateUnitCodeSuggestionService : ICodeSuggestor<EstateUnit>
{
  private readonly IReadRepository<Estate> _estateRepository;

  public EstateUnitCodeSuggestionService(IReadRepository<Estate> estateRepository)
  {
    _estateRepository = estateRepository;
  }

  public async Task<string?> SuggestNextCode(int? parentId, EstateUnit? partialEntity, string[]? additionallyOccupiedCodes)
  {
    ArgumentNullException.ThrowIfNull(parentId);

    var parentCode = await GetParentCode(parentId.Value) ?? string.Empty;
    var occupiedCodes = await GetOccupiedCodes(parentId.Value);

    return SuggestNextCode(parentCode, occupiedCodes.Concat(additionallyOccupiedCodes ?? Array.Empty<string>()));
  }

  public async Task<string> SuggestNextCode(int? parentId, string[] additionalOccupiedCodes)
  {
    ArgumentNullException.ThrowIfNull(additionalOccupiedCodes);
    ArgumentNullException.ThrowIfNull(parentId);

    var parentCode = await GetParentCode(parentId.Value) ?? string.Empty;
    var occupiedCodes = await GetOccupiedCodes(parentId.Value);

    return SuggestNextCode(parentCode, occupiedCodes.Concat(additionalOccupiedCodes));
  }

  public string SuggestNextCode(string parentCode) => throw new NotImplementedException();
  public Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes) => throw new NotImplementedException();

  private Task<IEnumerable<string>> GetOccupiedCodes(int parentId)
    => _estateRepository
      .AsQueryable(new GetByIdSpec<Estate>(parentId))
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .Select(estate => estate.EstateUnits.Select(estateUnit => estateUnit.InternalCode))
      .SingleAsync();

  private Task<string> GetParentCode(int parentId)
    => _estateRepository
      .AsQueryable(new GetByIdSpec<Estate>(parentId))
      .Select(estate => estate.InternalCode)
      .SingleAsync();

  private static string SuggestNextCode(string parentCode, IEnumerable<string?> occupiedCodes)
  {
    var maxCode = occupiedCodes.DefaultIfEmpty().Max();

    var actualNumber = string.IsNullOrEmpty(maxCode)
      ? 0
      : !Regex.IsMatch(maxCode, "\\d+$")
        ? 0
        : Convert.ToInt32(Regex.Match(maxCode, "\\d+$").Value);

    var proposedCode = SuggestCode(parentCode, actualNumber);

    while (occupiedCodes.Any(code => code == proposedCode))
    {
      actualNumber++;
      proposedCode = SuggestCode(parentCode, actualNumber);
    }

    return proposedCode;
  }

  private static string SuggestCode(string parentCode, int unoccupiedNumber)
    => $"{parentCode}U{unoccupiedNumber.ToString().PadLeft(3, '0')}";
}
