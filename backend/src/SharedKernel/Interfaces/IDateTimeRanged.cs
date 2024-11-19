namespace RealGimm.SharedKernel.Interfaces;

public interface IDateTimeRanged
{
  DateTime? Since { get; }
  DateTime? Until { get; }
}
