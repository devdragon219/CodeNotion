namespace RealGimm.Infrastructure.Docs;

public interface ICmisConfigProvider
{
  Task InitializeAsync(CancellationToken cancellationToken);
  string? AtomUrl { get; }
  string? Username { get; }
  string? Password { get; }
  string? BaseDirectory { get; }
}