using RealGimm.Core.Docs.DocumentAggregate;

namespace RealGimm.Web.Docs.Models;

public record DocumentInput(
  string? CmisId,
  string Name,
  string? FileName,
  ContentType ContentType,
  ContentCategory ContentCategory,
  DateTime? Since,
  DateTime? Until,
  string? MimeType,
  string? Issuer,
  string? IssuerCode,
  DateOnly? IssueDate,
  string? ProtocolNumber,
  IFile? Content,
  string? Notes
);
