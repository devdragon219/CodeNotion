using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Fclt.TicketAggregate;

public class Reply : EntityBase
{
  public DateTime Timestamp { get; private set; }
  public bool IsOperator { get; private set; }
  public int UserId { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Comment { get; private set; }

  public void SetTimestamp(DateTime timestamp) => Timestamp = timestamp;

  public void SetIsOperator(bool isOperator) => IsOperator = isOperator;

  public void SetUserId(int userId) => UserId = userId;

  public void SetComment(string? comment) => Comment = comment;
}
