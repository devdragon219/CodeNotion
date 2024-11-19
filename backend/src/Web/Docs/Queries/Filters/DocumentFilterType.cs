using HotChocolate.Data.Filters;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Extensions;

namespace RealGimm.Web.Docs.Queries.Filters;

public class DocumentFilterType : FilterInputType<Document>
{
  protected override void Configure(IFilterInputTypeDescriptor<Document> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.Ignore(document => document.EntityIntId);
    
    descriptor
      .Field(document => document.ContentCategoryGroup)
      .Name("contentCategoryGroupIn")
      .Type<ListType<StringType>>()
      .Extend()
      .OnBeforeCreate((_, definition) => definition.Handler = new DocumentContentCategoryGroupInFilterHandler());

    descriptor
      .Field("contentContains")
      .Type<StringType>()
      .Extend()
      .OnBeforeCreate((_, definition) => definition.Handler = new DocumentContentContainsFilterHandler());
  }
}
