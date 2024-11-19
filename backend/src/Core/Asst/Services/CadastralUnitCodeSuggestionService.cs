using System.Text.RegularExpressions;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Asst.Services;

public class CadastralUnitCodeSuggestionService : ICodeSuggestor<CadastralUnit>
{
  private readonly IReadRepository<EstateUnit> _estateUnitRepository;

  public CadastralUnitCodeSuggestionService(IReadRepository<EstateUnit> estateUnitRepository)
  {
    _estateUnitRepository = estateUnitRepository;
  }

  public async Task<string?> SuggestNextCode(int? parentId, CadastralUnit? partialEntity, string[]? additionallyOccupiedCodes)
  {
    ArgumentNullException.ThrowIfNull(parentId);

    var parentCode = await _estateUnitRepository
      .AsQueryable(new GetByIdSpec<EstateUnit>(parentId.Value))
      .Select(estateUnit => estateUnit.InternalCode)
      .SingleAsync() ?? string.Empty;

    var ocuupiedCodes = await _estateUnitRepository
      .AsQueryable(new GetByIdSpec<EstateUnit>(parentId.Value))
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .SelectMany(estateUnit => estateUnit.CadastralUnits
        .Select(cadastralUnit => cadastralUnit.InternalCode))
      .ToArrayAsync();

    return InternalSuggestNextCode(parentCode, ocuupiedCodes.Concat(additionallyOccupiedCodes ?? Array.Empty<string>()));
  }

  public Task<string> SuggestNextCode(int? parentId, string[] additionallyOccupiedCodes) => throw new NotImplementedException();
  public Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes) => throw new NotImplementedException();

  public string SuggestNextCode(string parentCode)
    => InternalSuggestNextCode(parentCode, ocuupiedCodes: Array.Empty<string>());

  private static string InternalSuggestNextCode(string parentCode, IEnumerable<string?> ocuupiedCodes)
  {
    var maxOccupiedCode = ocuupiedCodes.DefaultIfEmpty().Max();

    var actualNumber = string.IsNullOrEmpty(maxOccupiedCode)
      ? 0
      : Regex.IsMatch(maxOccupiedCode, "\\d+$")
        ? Convert.ToInt32(Regex.Match(maxOccupiedCode, "\\d+$").Value)
        : 0;

    string? proposedCode;

    do
    {
      actualNumber++;
      proposedCode = SuggestCode(parentCode, actualNumber);
    }
    while (ocuupiedCodes.Any(ocuupiedCode => ocuupiedCode == proposedCode));

    return proposedCode;
  }

  private static string SuggestCode(string parentCode, int unoccupiedNumber)
    => $"{parentCode}C{unoccupiedNumber.ToString().PadLeft(3, '0')}";
}
