using System.Xml.Linq;

namespace RealGimm.Core.Shared.Interfaces;

public interface IXmlGenerator<TData>
{
  public Task<XDocument> GenerateXmlAsync(TData data, CancellationToken cancellationToken);
}
