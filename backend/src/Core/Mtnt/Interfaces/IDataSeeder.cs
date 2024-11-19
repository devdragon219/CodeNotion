namespace RealGimm.Core.Mtnt.Interfaces;

public interface IDataSeeder
{
  Task InitializeAsync(string adminUsername, string adminPasswordHash, CancellationToken cancellationToken);
  Task InitializePerCountryAsync(string countryIso3, CancellationToken cancellationToken);
  Task UpdateAsync(CancellationToken cancellationToken);
}
