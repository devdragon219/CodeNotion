using Ardalis.Result;
using HotChocolate;
using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Anag.SubjectAggregate;

public class BankAccount : EntityBase
{
  [GraphQLIgnore]
  public int SubjectId { get; private set; }
  public BankAccountType BankAccountType { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ReferenceCode { get; private set; }
  public BankAccountCodeType ReferenceCodeType { get; private set; }

  [MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }
  [MaxLength(StrFieldSizes.NAME)]
  public string? AccountHolder { get; private set; }

  public DateTime CreationDate { get; private set; } = DateTime.UtcNow;

  public void SetCreationDate(DateTime newCreationDate) => CreationDate = newCreationDate;

  public void SetType(BankAccountType type) => BankAccountType = type;
  public void SetHolder(string? accountHolder) => AccountHolder = accountHolder;

  public void SetReference(string? code, BankAccountCodeType type)
  {
    ReferenceCode = code;
    ReferenceCodeType = type;
  }

  public void SetNotes(string? notes) => Notes = notes;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(AccountHolder))
    {
      yield return ErrorCode.AccountHolderNameIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(ReferenceCode))
    {
      yield return ErrorCode.ReferenceCodeIsNullOrEmptyString.ToValidationError();
      yield break;
    }

    if (ReferenceCodeType == BankAccountCodeType.IBAN && !BankAccountValidator.CheckIBAN(ReferenceCode!))
    {
      yield return ErrorCode.ReferenceCodeIsNotValidIBAN.ToValidationError();
    }
  }
}
