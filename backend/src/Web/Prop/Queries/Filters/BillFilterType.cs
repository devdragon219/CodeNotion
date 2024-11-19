using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Prop.Queries.Filters;

public class BillFilterType : FilterInputType<Bill>
{
  protected override void Configure(IFilterInputTypeDescriptor<Bill> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .Field(bill => !bill.FinalDate.HasValue)
      .Type<BooleanOperationFilterInputType>()
      .Name("isTemporary");

    descriptor.BindExtensionStringField<Bill, Subject>("managementSubjectName",
      str => subject => subject.Name!.Contains(str),
      idArray => bill => idArray.Contains(bill.Contract!.ManagementSubjectId)
    );

    descriptor.BindExtensionStringField<Bill, Subject>("counterpartSubjectName",
      str => subject => subject.Name!.Contains(str),
      idArray => bill => idArray.Contains(bill.MainCounterpartSubjectId)
    );

    descriptor.BindExtensionStringField<Bill, EstateUnit>("estateUnitInternalCode",
      str => eu => eu.InternalCode!.Contains(str),
      idArray => bill => bill.EstateUnitId.HasValue ? idArray.Contains(bill.EstateUnitId.Value) : false
    );

    descriptor.BindExtensionStringField<Bill, EstateUnit>("estateUnitAddress",
      str => eu => (eu.Address!.Toponymy! + "," + eu.Address!.Numbering! + "-" + eu.Address!.LocalPostCode! + "-" + eu.Address!.CityName! + "-" + eu.Address!.CountryName!).ToLower().Contains(str.ToLower()),
      idArray => bill => bill.EstateUnitId.HasValue ? idArray.Contains(bill.EstateUnitId.Value) : false
    );

    descriptor.BindExtensionStringField<Bill, Subject>("transactorSubjectName",
      str => subject => subject.Name!.Contains(str),
      idArray => bill => idArray.Contains(bill.TransactorSubjectId)
    );
  }
}
