using HotChocolate.Data.Sorting;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Prop.Queries.Sorting;

public class AdministrationSortInputType : SortInputType<Administration>
{
  protected override void Configure(ISortInputTypeDescriptor<Administration> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .BindExtensionStringField<Administration, Estate>("estateInternalCode",
          eu => eu.InternalCode!,
          idDict => administration => idDict[administration.EstateId]
        );

    descriptor
      .BindExtensionStringField<Administration, Subject>("administrationSubjectName",
          subject => subject.Name!,
          idDict => administration => idDict[administration.AdministratorSubjectId]
        );

    descriptor
      .BindExtensionStringField<Administration, Estate>("estateAddress",
          eu => eu.PrimaryAddress != null ? eu.PrimaryAddress!.Toponymy! + "," + eu.PrimaryAddress!.Numbering! + "-" + eu.PrimaryAddress!.LocalPostCode! + "-" + eu.PrimaryAddress!.CityName! + "-" + eu.PrimaryAddress!.CountryName! : string.Empty,
          idDict => administration => idDict[administration.EstateId]
        );

  }
}
