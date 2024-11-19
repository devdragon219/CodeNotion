using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class QualificationLevelMapper : IMapper<QualificationLevelInput, QualificationLevel>
{
  public QualificationLevel? MapAsync(QualificationLevelInput? from, QualificationLevel? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var qualificationLevel = into ?? new QualificationLevel();
    qualificationLevel.SetName(from.Name);
    qualificationLevel.SetInternalCode(from.InternalCode);
    qualificationLevel.SetOrdering(from.Ordering);

    return qualificationLevel;
  }

  Task<QualificationLevel?> IMapper<QualificationLevelInput, QualificationLevel>.MapAsync(
    QualificationLevelInput? from,
    QualificationLevel? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
