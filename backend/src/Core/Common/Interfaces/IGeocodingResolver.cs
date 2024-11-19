using NetTopologySuite.Geometries;
using RealGimm.Core.CrossModule;

namespace RealGimm.Core.Common.Interfaces;

public interface IGeocodingResolver
{
  Task<GeocodingResult?> ResolveAddress(IAddress address, CancellationToken cancellationToken = default);
}