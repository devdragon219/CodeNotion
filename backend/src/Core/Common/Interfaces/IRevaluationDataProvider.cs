namespace RealGimm.Core.Common.Interfaces;

public interface IRevaluationDataProvider
{
  Guid Id { get; }
  bool CanHandleCountry(string countryIso3);
  Task ImportUpdatesMasterList(string countryIso3, CancellationToken cancellationToken);
}
