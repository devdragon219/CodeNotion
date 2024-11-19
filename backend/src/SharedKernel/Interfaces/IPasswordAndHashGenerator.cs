namespace RealGimm.SharedKernel.Interfaces;

public interface IPasswordAndHashGenerator
{
  (string Password, string PasswordHash) MakePasswordAndHash();
}