using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Asst;

public sealed class CatalogueItemInputFaker : BaseSeededFaker<CatalogueItemInput>
{
  public ICollection<Estate> Estates { get; private set; } = Array.Empty<Estate>();
  public ICollection<CatalogueType> CatalogueTypes { get; private set; } = Array.Empty<CatalogueType>();
  public CatalogueItemFieldInputFaker FieldInputFaker { get; private set; } = new();

  public CatalogueItemInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var (status, decommissioningDate) = CatalogueItemFaker.GenerateStatus(faker);
      var type = CatalogueItemFaker.PickType(faker, CatalogueTypes);

      var fieldInputs = new List<CatalogueItemFieldInput>();
      foreach (var row in type.Fields!)
      {
        foreach (var typeField in row)
        {
          var fieldInput = FieldInputFaker.UseTypeField(typeField).Generate();
          fieldInputs.Add(fieldInput);
        }
      }

      var input = new CatalogueItemInput()
      {
        EstateId = CatalogueItemFaker.PickEstate(faker, Estates).Id,
        InternalCode = CatalogueItemFaker.GenerateInternalCode(faker),
        Status = status,
        ActivationDate = CatalogueItemFaker.GenerateActivationDate(faker),
        LastMaintenanceDate = CatalogueItemFaker.GenerateLastMaintenanceDate(faker),
        DecommissioningDate = decommissioningDate,
        CatalogueTypeId = type.Id,
        Fields = fieldInputs.ToArray()
      };

      return input;
    });
  }

  public CatalogueItemInputFaker UseEstates(ICollection<Estate> estates)
  {
    Estates = estates ?? throw new ArgumentNullException(nameof(estates));

    return this;
  }

  public CatalogueItemInputFaker UseEstates(params Estate[] estates)
    => UseEstates(estates as ICollection<Estate>);

  public CatalogueItemInputFaker UseTypes(ICollection<CatalogueType> types)
  {
    CatalogueTypes = types ?? throw new ArgumentNullException(nameof(types));

    return this;
  }

  public CatalogueItemInputFaker UseTypes(params CatalogueType[] types)
    => UseTypes(types as ICollection<CatalogueType>);

  public CatalogueItemInputFaker UseFieldInputFaker(CatalogueItemFieldInputFaker fieldInputFaker)
  {
    FieldInputFaker = fieldInputFaker ?? throw new ArgumentNullException(nameof(fieldInputFaker));

    return this;
  }
}
