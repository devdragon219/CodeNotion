namespace RealGimm.Core.Common;

public class GeocodingResult
{
  public float[] BoundingBox { get; set; } = Array.Empty<float>();
  public float[]? Position { get; set; }
}