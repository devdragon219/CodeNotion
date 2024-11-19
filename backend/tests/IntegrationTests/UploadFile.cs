using System.Text;
using HotChocolate.Types;

namespace RealGimm.IntegrationTests;

public class UploadFile : IFile
{
  public string Name { get; private set; }

  public long? Length => Name.Length;

  public string? ContentType => "text/plain";

  public async Task CopyToAsync(Stream target, CancellationToken cancellationToken = default)
  {
    await target.WriteAsync(Encoding.UTF8.GetBytes(Name), cancellationToken);
  }

  public Stream OpenReadStream()
  {
    return new MemoryStream(Encoding.UTF8.GetBytes(Name));
  }

  public UploadFile()
  {
    Name = Guid.NewGuid().ToString();
  }
}