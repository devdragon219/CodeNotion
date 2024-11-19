namespace RealGimm.Core.Prop.RegistryCommunicationAggregate;

public enum CommunicationType
{
  Ita_RLI12_FirstRegistration = 1,
  Ita_RLI12_Update = 2,
  Ita_RLI12_Takeover = 3,
  Ita_RLI12_Death = 4,
  Ita_RLI12_Transfer = 5,
  //Please leave numbering space for future communication types
  // (i.e. next country/form starts from 20)
}
