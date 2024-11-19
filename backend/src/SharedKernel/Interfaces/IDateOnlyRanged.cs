namespace RealGimm.SharedKernel.Interfaces;

public interface IDateOnlyRanged
{
  public DateOnly? Since { get; }
  public DateOnly? Until { get; }
}
