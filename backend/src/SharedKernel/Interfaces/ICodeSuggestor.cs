namespace RealGimm.SharedKernel.Interfaces;

public interface ICodeSuggestor<T>
  where T : class, IInternallyCoded
{
  public Task<string?> SuggestNextCode(int? parentId = null, T? partialEntity = null, string[]? additionallyOccupiedCodes = null);
  
  public Task<string> SuggestNextCode(int? parentId, string[] additionallyOccupiedCodes);
  
  public Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes);

  public string SuggestNextCode(string parentCode);
}
