using HotChocolate.Data.Filters;
using HotChocolate.Data.Sorting;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Prop.Queries.Sorting;

public class BillSortInputType : SortInputType<Bill>
{
  protected override void Configure(ISortInputTypeDescriptor<Bill> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .Field(bill => !bill.FinalDate.HasValue)
      .Name("isTemporary");

    descriptor
      .BindExtensionStringField<Bill, Subject>("managementSubjectName",
          subject => subject.Name!,
          idDict => bill => idDict[bill.Contract!.ManagementSubjectId]
        );

    descriptor
      .BindExtensionStringField<Bill, Subject>("counterpartSubjectName",
          subject => subject.Name!,
          idDict => bill => idDict[bill.MainCounterpartSubjectId]
        );

    descriptor
      .BindExtensionStringField<Bill, EstateUnit>("estateUnitInternalCode",
          eu => eu.InternalCode!,
          idDict => bill => idDict[bill.EstateUnitId.HasValue ? bill.EstateUnitId.Value : default]
        );

    descriptor
      .BindExtensionStringField<Bill, EstateUnit>("estateUnitAddress",
          eu => eu.Address!.Toponymy! + "," + eu.Address!.Numbering! + "-" + eu.Address!.LocalPostCode! + "-" + eu.Address!.CityName! + "-" + eu.Address!.CountryName!,
          idDict => bill => idDict[bill.EstateUnitId.HasValue ? bill.EstateUnitId.Value : default]
        );
    
    descriptor
      .BindExtensionStringField<Bill, Subject>("transactorSubjectName",
          subject => subject.Name!,
          idDict => bill => idDict[bill.TransactorSubjectId]
        );
  }
}

