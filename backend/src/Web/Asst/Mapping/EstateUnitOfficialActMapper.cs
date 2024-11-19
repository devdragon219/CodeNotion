using RealGimm.Core.Common.OfficialActAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class EstateUnitOfficialActMapper : IMapper<EstateUnitOfficialActInput, OfficialAct>
{
  public Task<OfficialAct?> MapAsync(EstateUnitOfficialActInput? from, OfficialAct? into, CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  public OfficialAct? Map(EstateUnitOfficialActInput? from, OfficialAct? into)
  {
    if (from is null)
    {
      return null;
    }

    var officialAct = into ?? new OfficialAct();
    officialAct.SetProtocolNumber(from.ProtocolNumber);
    officialAct.AddActRegistrationField(new(RegistrationFieldType.IT_REPERTOIRE_NUMBER, from.RepertoireNumber));
    
    officialAct.SetRegistrationData(from.RegistrationNumber, from.RegistrationDate);
    officialAct.AddActRegistrationField(new(RegistrationFieldType.IT_WRITTEN_AT_CITY, from.WrittenAtCity));

    officialAct.AddActRegistrationField(new(RegistrationFieldType.IT_TRANSCRIPTION_NUMBER, from.TranscriptionNumber));
    officialAct.AddActRegistrationField(new(RegistrationFieldType.IT_TRANSCRIPTION_CITY, from.TranscriptionCity));

    if (from.TranscriptionDate.HasValue)
    {
      officialAct.AddActRegistrationDate(new(RegistrationDateType.IT_TRANSCRIPTION_DATE, from.TranscriptionDate.Value));
    }
    
    officialAct.AddActRegistrationDate(new(RegistrationDateType.IT_NOTARY_ACT_DATE, from.NotaryActDate));
    officialAct.AddActRegistrationField(new(RegistrationFieldType.IT_COLLECTION_NUMBER, from.CollectionNumber));
    officialAct.SetIssueData(from.NotaryName, null, null, null);

    return officialAct;
  }
}
