namespace RealGimm.Infrastructure.Common.InterestRateProvider.Models;

public class InterestRateDto
{
  public DateOnly StartDate { get; set; }
  public DateOnly? EndDate { get; set; }
  public string? Notes { get; set; }
  public decimal InterestRate { get; set; }

  public InterestRateDto() { }
  public InterestRateDto(int startYear, int startMonth, int startDay,
    int? endYear, int? endMonth, int? endDay,
    decimal interestRate,
    string? notes = null)
  {
    StartDate = new DateOnly(startYear, startMonth, startDay);
    if (endYear is not null && endMonth is not null && endDay is not null)
    {
      EndDate = new DateOnly(endYear.Value, endMonth.Value, endDay.Value);
    }
    InterestRate = interestRate;
    Notes = notes;
  }
}