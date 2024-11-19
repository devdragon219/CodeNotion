using System.ComponentModel.DataAnnotations;
using HotChocolate;
using RealGimm.Core.Docs.DocumentAggregate.Extensions;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Docs.DocumentAggregate;

public class Document : EntityBase, IAggregateRoot, IDateTimeRanged
{
  private string? _entityId;

  [MaxLength(StrFieldSizes.NAME)]
  public string Name { get; private set; } = default!;
  [MaxLength(StrFieldSizes.NAME)]
  public string? FileName { get; private set; }
  public ContentType ContentType { get; private set; }
  public ContentCategory ContentCategory { get; private set; }
  public string ContentCategoryGroup => ContentCategory.GetGroupName();
  public DateTime CreationDate { get; private set; }
  public DateTime? Since { get; private set; }
  public DateTime? Until { get; private set; }
  [GraphQLIgnore]
  public Stream? Data
  {
    get
    {
      if (_dataStream != null)
      {
        return _dataStream;
      }
      if (_dataStreamGetter != null)
      {
        _dataStream = _dataStreamGetter();
        return _dataStream;
      }
      return null;
    }
  }
  private Stream? _dataStream;
  private Func<Stream?>? _dataStreamGetter;

  [GraphQLIgnore]
  public long DataLength { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? MimeType { get; private set; }
  [MaxLength(StrFieldSizes.NAME)]
  public string Folder { get; private set; } = default!;
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string TenantId { get; private set; } = default!;
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string[] ManagementSubjectIds { get; private set; } = default!;
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? EntityId
  {
    get => _entityId;
    private set
    {
      if (value == _entityId)
      {
        return;
      }

      _entityId = value;
      EntityIntId = value is null ? null : int.Parse(value.Split('-')[^1]);
    }
  }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? EstateId { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string CmisId { get; private set; } = default!;
  [MaxLength(StrFieldSizes.NAME)]
  public string? UploaderName { get; private set; }
  [MaxLength(StrFieldSizes.NAME)]
  public string? Issuer { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? IssuerCode { get; private set; }
  public DateOnly? IssueDate { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ProtocolNumber { get; private set; }
  [GraphQLIgnore]
  public bool IsMetadataUpdated { get; private set; } = false;

  [MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public int? EntityIntId { get; private set; }

  public Document()
  {
    CreationDate = DateTime.UtcNow;
  }

  public void SetNotes(string? notes)
  {
    if (!IsMetadataUpdated && !NullableComparer.Equals(notes, Notes))
    {
      IsMetadataUpdated = true;
    }

    Notes = notes;
  }

  public void SetBaseData(string name,
    string? fileName,
    ContentType contentType,
    ContentCategory contentCategory,
    string? uploaderName,
    DateTime creationDate)
  {
    var newFolder = Enum.GetName(contentCategory) ?? "Generic";

    if (!IsMetadataUpdated &&
      (name != Name
        || contentType != ContentType
        || contentCategory != ContentCategory
        || newFolder != Folder
        || !NullableComparer.Equals(fileName, FileName)))
    {
      IsMetadataUpdated = true;
    }

    Name = name;
    FileName = fileName;
    ContentType = contentType;
    ContentCategory = contentCategory;
    Folder = newFolder;
    UploaderName = uploaderName;
    CreationDate = creationDate;
  }

  public void SetOwnership<TOwner>(int[] managementSubjectIds, int entityId, int? estateId)
  {
    var newMgmtIds = managementSubjectIds.Select(s => s.ToString())
      .Distinct()
      .Order()
      .ToArray();

    var newOwner = MakeOwnerId<TOwner>(entityId);
    var newEstate = estateId?.ToString();

    if (!IsMetadataUpdated &&
      (newOwner != EntityId
        || !NullableComparer.Equals(EstateId, newEstate)
        || !newMgmtIds.SequenceEqual(ManagementSubjectIds)))
    {
      IsMetadataUpdated = true;
    }

    ManagementSubjectIds = newMgmtIds;
    EntityId = newOwner;
    EstateId = newEstate;
  }

  public void SetOwnershipData(string tenantId, string[] managementSubjectId, string? entityId, string? estateId)
  {
    var newMgmtIds = managementSubjectId.Distinct().Order().ToArray();

    if (!IsMetadataUpdated &&
      (entityId != EntityId
        || !NullableComparer.Equals(EstateId, estateId)
        || tenantId != TenantId
        || !newMgmtIds.SequenceEqual(ManagementSubjectIds)))
    {
      IsMetadataUpdated = true;
    }

    TenantId = tenantId;
    ManagementSubjectIds = managementSubjectId;
    EntityId = entityId;
    EstateId = estateId;
  }

  public void SetStream(Stream s, long length, string mimeType)
  {
    IsMetadataUpdated = true;
    _dataStream = s;
    DataLength = length;
    MimeType = mimeType;
  }

  public void ClearStream()
  {
    _dataStream = null;
    DataLength = 0;
    MimeType = null;
  }

  public void SetStreamGetter(Func<Stream?> streamGetter, string mimeType)
  {
    _dataStreamGetter = streamGetter;
    MimeType = mimeType;
  }

  public void UpdateCmisId(string newId)
  {
    if (!IsMetadataUpdated && newId != CmisId)
    {
      IsMetadataUpdated = true;
    }
    CmisId = newId;
  }

  public void SetValidity(DateTime? since, DateTime? until)
  {
    if (!IsMetadataUpdated && (
      !NullableComparer.Equals(Since, since)
      || !NullableComparer.Equals(Until, until)))
    {
      IsMetadataUpdated = true;
    }
    Since = since;
    Until = until;
  }

  public void SetIssuer(string? issuerName, string? issuerCode, DateOnly? issueDate)
  {
    if (!IsMetadataUpdated && (
      !NullableComparer.Equals(issuerName, Issuer)
      || !NullableComparer.Equals(issuerCode, IssuerCode)
      || !NullableComparer.Equals(issueDate, IssueDate)))
    {
      IsMetadataUpdated = true;
    }

    Issuer = issuerName;
    IssuerCode = issuerCode;
    IssueDate = issueDate;
  }

  public void SetIssuer(string? issuerName, string? issuerCode, DateTime? issueDate)
  {
    SetIssuer(issuerName,
      issuerCode,
      issueDate is null ? null : DateOnly.FromDateTime(issueDate.Value));
  }

  public void SetProtocol(string? protocolNumber)
  {
    if (!IsMetadataUpdated && !NullableComparer.Equals(protocolNumber, ProtocolNumber))
    {
      IsMetadataUpdated = true;
    }
    ProtocolNumber = protocolNumber;
  }

  public static string MakeOwnerId<T>(int entityId)
  {
    return MakeOwnerBase($"{typeof(T).FullName ?? string.Empty}-{entityId}");
  }

  public static string MakeOwner<T>()
  {
    return MakeOwnerBase($"{typeof(T).FullName ?? string.Empty}");
  }

  private static string MakeOwnerBase(string ownerId)
  {
    if (ownerId.StartsWith("RealGimm.Core"))
    {
      ownerId = ownerId[14..];
    }

    return ownerId.Replace("Aggregate", string.Empty);
  }
}
