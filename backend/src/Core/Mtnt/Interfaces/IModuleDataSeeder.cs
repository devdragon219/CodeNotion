namespace RealGimm.Core.Mtnt.Interfaces;

public interface IModuleDataSeeder
{
  Task InitializeAsync();
  Task UpdateAsync();
}
