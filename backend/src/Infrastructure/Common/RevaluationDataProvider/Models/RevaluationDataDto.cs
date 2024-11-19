namespace RealGimm.Infrastructure.Common.RevaluationDataProvider.Models;

public class RevaluationDataDto
{
  public int Year { get; set; }
  public int Month { get; set; }
  public int BaseYear { get; set; }
  public decimal RevaluationIndex { get; set; }
}