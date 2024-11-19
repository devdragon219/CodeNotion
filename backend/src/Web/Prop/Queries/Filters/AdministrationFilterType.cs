using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Prop.Queries.Filters;

public class AdministrationFilterType : FilterInputType<Administration>
{
  protected override void Configure(IFilterInputTypeDescriptor<Administration> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<Administration, Estate>("estateInternalCode",
      str => es => es.InternalCode!.Contains(str),
      idArray => administration => idArray.Contains(administration.EstateId)
    );

    descriptor.BindExtensionStringField<Administration, Subject>("administrationSubjectName",
      str => subject => subject.Name!.Contains(str),
      idArray => administration => idArray.Contains(administration.AdministratorSubjectId)
    );

    descriptor.BindExtensionStringField<Administration, Estate>("estateAddress",
      str => es => (es.PrimaryAddress != null ? es.PrimaryAddress!.Toponymy! + "," + es.PrimaryAddress!.Numbering! + "-" + es.PrimaryAddress!.LocalPostCode! + "-" + es.PrimaryAddress!.CityName! + "-" + es.PrimaryAddress!.CountryName! : string.Empty).Contains(str),
      idArray => administration => idArray.Contains(administration.EstateId)
    );
  }
}
