using Ardalis.Specification;

namespace RealGimm.Core.Common.CustomCodeAggregate.Specification;

public class CustomCodeTranscoding<T> : Specification<CustomCode> where T:EntityBase
{
  public CustomCodeTranscoding(Guid dataProvider)
  {
    var name = typeof(T).Name;
    
    Query.Where(cc => cc.DataProvider == dataProvider
      && cc.Group == name
      && cc.Function == CustomCodeFunction.Transcoding);
  }
}
