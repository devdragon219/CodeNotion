using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Core.Reports;

public sealed record RowByCity(string? CityName, string? CityCadastralCode, int EstateUnitsCount, decimal Value);

public sealed record MainRowByCity(Subject ManagementSubject, IEnumerable<RowByCity> SubRows);