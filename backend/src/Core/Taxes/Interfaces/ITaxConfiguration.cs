using HotChocolate;
using HotChocolate.Types;
using RealGimm.Core.Common.TaxConfigAggregate;

namespace RealGimm.Core.Taxes.Interfaces;

[InterfaceType]
public interface ITaxConfiguration
{
  Table[] AvailableMainTables { get; }
  Dictionary<string, Table[]> AvailableSubTables { get; }

  [GraphQLIgnore]
  Task<IEnumerable<TaxConfig>> GetTableValues(
    string tableReference,
    CancellationToken cancellationToken);

  [GraphQLIgnore]
  Task<IEnumerable<TaxConfigSubValue>> GetSubTableValues(
    string tableReference,
    int year,
    Guid? groupReference,
    string subTable,
    CancellationToken cancellationToken);

  [GraphQLIgnore]
  Task UpdateSubTable(
    string tableReference,
    int year,
    Guid? groupReference,
    IEnumerable<TaxConfigSubValue> values,
    CancellationToken cancellationToken);

  [GraphQLIgnore]
  Task AddGroup(
    string tableReference,
    int year,
    Guid? groupReference,
    CancellationToken cancellationToken);

  [GraphQLIgnore]
  Task RemoveGroup(int taxConfigId, CancellationToken cancellationToken);

  [GraphQLIgnore]
  Task<Dictionary<string, string>> GetSubTableMappings(string mainTable, string subTable);
}
