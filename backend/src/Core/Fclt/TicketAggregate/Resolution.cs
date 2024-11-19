using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Fclt.TicketAggregate;

public class Resolution
{
  public DateTime? InterventionStart { get; private set; }
  
  //If this is a checklist, this value is calculated from the set "duration" field
  public DateTime? InterventionEnd { get; private set; }
  
  //If this is a checklist, this value is the compiled date
  public DateTime? Closure { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? OperationsPerformed { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Diagnosis { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? ResolutionNotes { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? PartsAndSupplies { get; private set; }

  public void SetData(DateTime? interventionStart,
    DateTime? interventionEnd,
    DateTime? closure,
    string? operationsPerformed,
    string? diagnosis,
    string? resolutionNotes,
    string? partsAndSupplies)
  {
    InterventionStart = interventionStart;
    InterventionEnd = interventionEnd;
    Closure = closure;
    OperationsPerformed = operationsPerformed;
    Diagnosis = diagnosis;
    ResolutionNotes = resolutionNotes;
    PartsAndSupplies = partsAndSupplies;
  }
}
