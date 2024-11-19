namespace RealGimm.Core.Common.Interfaces;

public interface ICityProvider
{
  Guid Id { get; }
  bool CanHandleCountry(string countryIso3);
  Task ImportUpdatesMasterList(string countryIso3, string? overrideUrl, CancellationToken cancellationToken);
  Task ImportUpdatesBoundaryPolygon(string countryIso3, string? overrideUrl, CancellationToken cancellationToken);
}
