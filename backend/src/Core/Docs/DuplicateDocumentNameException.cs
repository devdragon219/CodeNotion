namespace RealGimm.Core.Docs;

public class DuplicateDocumentNameException : Exception
{
  public string Name { get; }

  public DuplicateDocumentNameException(string name, Exception innerException) : base(nameof(DuplicateDocumentNameException), innerException)
  {
    Name = name;
  }
}