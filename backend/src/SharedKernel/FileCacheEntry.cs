using System.Text;
using System.Text.Json;

namespace RealGimm.SharedKernel;

public class FileCacheEntry
{
  public string FileName { get; private set; }
  public string MimeType { get; private set; }
  public string SharedAreaPath { get; private set; }
  public FileCacheEntry(string FileName, string MimeType, string SharedAreaPath)
  {
    this.FileName = FileName;
    this.MimeType = MimeType;
    this.SharedAreaPath = SharedAreaPath;
  }

  public static FileCacheEntry? FromByteArray(byte[]? source)
  {
    if(source is null) return null;
    
    return JsonSerializer.Deserialize<FileCacheEntry>(source);
  }

  public byte[] ToByteArray()
  {
    return Encoding.UTF8.GetBytes(JsonSerializer.Serialize(this));
  }
}