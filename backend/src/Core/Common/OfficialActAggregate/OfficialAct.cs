using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.OfficialActAggregate;

public class OfficialAct : EntityBase, IAggregateRoot
{
  [MaxLength(StrFieldSizes.DESCRIPTION), FuzzySearchable]
  public string? Description { get; private set; }
  public DateTime CreationDate { get; private set; }
  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string ProtocolNumber { get; private set; } = default!;
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ExternalCode { get; private set; } = default!;
  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? RegistrationNumber { get; private set; }
  [MaxLength(StrFieldSizes.NAME)]
  public string? IssuerName { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? IssuerCode { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? IssuerExternalCode { get; private set; }
  public DateOnly? IssueDate { get; private set; }
  public DateOnly? RegistrationDate { get; private set; }
  public int? EstateUnitId { get; private set; }

  private readonly List<ActRegistrationField> _actRegistrationFields = new();
  private readonly List<ActRegistrationDate> _actRegistrationDates = new();

  public IReadOnlyList<ActRegistrationField> ActRegistrationFields => _actRegistrationFields.AsReadOnly();
  public IReadOnlyList<ActRegistrationDate> ActRegistrationDates => _actRegistrationDates.AsReadOnly();

  public OfficialAct()
  {
    CreationDate = DateTime.UtcNow;
  }

  public void SetDescription(string? description) => Description = description;

  public void SetProtocolNumber(string protocolNumber) => ProtocolNumber = protocolNumber;

  public void SetEstateUnitData(int? estateUnitId) => EstateUnitId = estateUnitId;
  public void SetExternalCode(string? externalCode) => ExternalCode = externalCode;

  public void SetIssueData(string? issuerName, string? issuerCode, string? issuerExternalCode, DateOnly? issueDate)
  {
    IssuerName = issuerName;
    IssuerCode = issuerCode;
    IssuerExternalCode = issuerExternalCode;
    IssueDate = issueDate;
  }

  public void SetRegistrationData(string? registrationNumber, DateOnly? registrationDate)
  {
    RegistrationDate = registrationDate;
    RegistrationNumber = registrationNumber;
  }

  public void AddActRegistrationField(ActRegistrationField actRegistrationField)
  {
    ArgumentNullException.ThrowIfNull(actRegistrationField);

    var existing = _actRegistrationFields.FirstOrDefault(f => f.FieldType == actRegistrationField.FieldType);

    if (existing is null)
    {
      _actRegistrationFields.Add(actRegistrationField);
    }
    else
    {
      existing.SetValue(actRegistrationField.Value);
    }
  }

  public void AddActRegistrationDate(ActRegistrationDate actRegistrationDate)
  {
    ArgumentNullException.ThrowIfNull(actRegistrationDate);

    var existing = _actRegistrationDates.FirstOrDefault(f => f.DateType == actRegistrationDate.DateType);

    if (existing is null)
    {
      _actRegistrationDates.Add(actRegistrationDate);
    }
    else
    {
      existing.SetValue(actRegistrationDate.Value);
    }
  }
}
