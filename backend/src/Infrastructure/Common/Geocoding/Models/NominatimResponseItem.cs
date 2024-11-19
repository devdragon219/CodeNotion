using System.Text.Json.Serialization;

namespace RealGimm.Infrastructure.Common.Geocoding.Models;

public class NominatimResponseItem
{
  [JsonPropertyName("lat")]
  public string? Latitude { get; set; }
  [JsonPropertyName("lon")]
  public string? Longitude { get; set; }
  [JsonPropertyName("boundingbox")]
  public string?[] BoundingBox { get; set; } = Array.Empty<string?>();
  [JsonPropertyName("osm_type")]
  public string? OsmType { get; set; }
}