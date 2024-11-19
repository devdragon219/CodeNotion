namespace RealGimm.SharedKernel.Interfaces;

public interface INetLocationProvider
{
  Task<string?> DescribeNetLocation(string? ipAddress);
}