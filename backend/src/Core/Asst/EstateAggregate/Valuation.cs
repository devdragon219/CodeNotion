using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Asst.EstateAggregate;

public class Valuation : EntityBase
{
  [GraphQLIgnore]
  public Estate Estate { get; private set; } = default!;
  public int ReferenceYear { get; private set; }
  public decimal? IASValue { get; private set; }
  public decimal? RBAValue { get; private set; }
  public decimal? MortgageAmount { get; private set; }
  public int? TransferYear { get; private set; }
  public int? RevampOperations { get; private set; }

  public void SetValues(decimal? ias, decimal? rba, decimal? mortgageAmt)
  {
    IASValue = ias;
    RBAValue = rba;
    MortgageAmount = mortgageAmt;
  }

  public void SetTransferYear(int? year)
  {
    TransferYear = year;
  }

  public void SetReferenceYear(int year)
  {
    ReferenceYear = year;
  }

  public void SetRevampOperations(int? operations)
  {
    RevampOperations = operations;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (ReferenceYear < DataLimits.MIN_YEAR || ReferenceYear > DataLimits.MAX_YEAR)
    {
      yield return ErrorCode.InvalidReferenceYear.ToValidationError();
    }
  }
}
