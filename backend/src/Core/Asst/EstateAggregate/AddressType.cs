using HotChocolate.Types;

namespace RealGimm.Core.Asst.EstateAggregate;

[EnumType(nameof(Asst) + nameof(AddressType))]
public enum AddressType
{
  Primary,
  OtherAddress
}
