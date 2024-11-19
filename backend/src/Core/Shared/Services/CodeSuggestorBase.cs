using Microsoft.EntityFrameworkCore;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using System.Text.RegularExpressions;

namespace RealGimm.Core.Shared.Services;

public abstract partial class CodeSuggestorBase<TEntity> : ICodeSuggestor<TEntity>
  where TEntity : class, IAggregateRoot, IInternallyCoded
{
  protected IReadRepository<TEntity> Repository { get; }

  public CodeSuggestorBase(IReadRepository<TEntity> repository)
  {
    Repository = repository;
  }

  public async Task<string?> SuggestNextCode(int? parentId, TEntity? partialEntity, string[]? additionallyOccupiedCodes)
  {
    var occupiedCodes = await GetOccupiedCodes();

    return SuggestCode(occupiedCodes.Concat(additionallyOccupiedCodes ?? Array.Empty<string>()), partialEntity);
  }

  public async Task<string> SuggestNextCode(int? parentId, string[] additionalOccupiedCodes)
  {
    var occupiedCodes = await GetOccupiedCodes();

    if (additionalOccupiedCodes is not null && additionalOccupiedCodes.Length > 0)
    {
      occupiedCodes = occupiedCodes.Concat(additionalOccupiedCodes);
    }

    return SuggestCode(occupiedCodes, null);
  }

  public virtual string SuggestNextCode(string parentCode)
    => throw new NotImplementedException();

  public virtual Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes)
    => throw new NotImplementedException();

  protected abstract string CreateCode(int unoccupiedNumber, TEntity? partialEntity);

  protected async Task<IEnumerable<string>> GetOccupiedCodes()
    => await Repository
      .AsQueryable()
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .Select(x => x.InternalCode!)
      .ToArrayAsync();

  private string SuggestCode(IEnumerable<string> occupiedCodes, TEntity? partialEntity)
  {
    var lastOccupiedNumber = 0;

    if (occupiedCodes.Any())
    {
      var maxOccupiedCode = occupiedCodes.Max()!;

      if (EndsWithNumberRegex().Match(maxOccupiedCode) is Match { Success: true } match)
      {
        lastOccupiedNumber = Convert.ToInt32(match.Value);
      }
    }

    string suggestedCode;

    do
    {
      lastOccupiedNumber++;
      suggestedCode = CreateCode(lastOccupiedNumber, partialEntity);
    }
    while (occupiedCodes.Any(occupiedCode => occupiedCode == suggestedCode));

    return suggestedCode;
  }

  [GeneratedRegex("\\d+$", RegexOptions.Compiled)]
  private static partial Regex EndsWithNumberRegex();
}
