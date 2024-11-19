using System.Text.Json;
using System.Text.Json.Serialization;
using NetTopologySuite;
using NetTopologySuite.Geometries;

namespace RealGimm.Infrastructure;

public class PointJsonConverter : JsonConverter<Point>
{
  private static readonly GeometryFactory _geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
  
  public override Point? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
  {
    var point = JsonSerializer.Deserialize<PointSerialized>(ref reader, options);
    return point is null
      ? null
      : _geometryFactory.CreatePoint(
        new Coordinate(point.Longitude, point.Latitude));
  }

  public override void Write(Utf8JsonWriter writer, Point value, JsonSerializerOptions options)
  {
    JsonSerializer.Serialize(writer, new PointSerialized
    {
      Latitude = value.Y,
      Longitude = value.X
    });
  }

  private sealed class PointSerialized
  {
    public double Latitude { get; set; }
    public double Longitude { get; set; }
  }
}
