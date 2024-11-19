using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Asst.Queries.Filters;

public class CadastralCoordinatesFilterType : FilterInputType<CadastralCoordinates>
{
  protected override void Configure(IFilterInputTypeDescriptor<CadastralCoordinates> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Ignore(e => e.CadastralUnit);
  }
}
