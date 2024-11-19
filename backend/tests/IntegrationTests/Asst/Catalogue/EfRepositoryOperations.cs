using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate.Specifications;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.CrossModule;
using Xunit;

namespace RealGimm.IntegrationTests.Asst.Catalogue;

public class EfRepositoryAdd : BaseEfRepoTestFixture
{
  [Fact]
  public async Task AddsUpdatesRemovesCategoryAndSubcategory()
  {
    var testName = Guid.NewGuid().ToString();
    var testCode = Guid.NewGuid().ToString();
    var ncat = new CatalogueCategory();

    ncat.SetName(testName);
    ncat.SetInternalCode(testCode);

    var repository = GetCategoryRepository();

    await repository.AddAsync(ncat);

    var newCat = (await repository.ListAsync())
                    .FirstOrDefault();

    Assert.Equal(testName, newCat?.Name);
    Assert.Equal(testCode, newCat?.InternalCode);
    Assert.True(newCat?.Id > 0);

    testName = Guid.NewGuid().ToString();
    testCode = Guid.NewGuid().ToString();
    var nSubcat = new CatalogueSubCategory();
    nSubcat.SetName(testName);
    nSubcat.SetInternalCode(testCode);

    newCat.SubCategories.Add(nSubcat);

    await repository.UpdateAsync(newCat);

    newCat = (await repository.ListAsync(new CatalogueCategoryIncludeAllSpec()))
                    .FirstOrDefault();

    Assert.NotNull(newCat);

    Assert.Collection(newCat.SubCategories, sc =>
    {
      Assert.Equal(testName, sc.Name);
      Assert.Equal(testCode, sc.InternalCode);
      Assert.True(sc.Id > 0);
    });

    newCat.SetName("NewName");

    await repository.UpdateAsync(newCat);

    newCat = (await repository.ListAsync(new CatalogueCategoryIncludeAllSpec()))
                    .FirstOrDefault();

    Assert.NotNull(newCat);

    Assert.Equal("NewName", newCat.Name);

    //Deletion should work
    await repository.DeleteAsync(newCat);

    newCat = (await repository.ListAsync(new CatalogueCategoryIncludeAllSpec()))
                    .FirstOrDefault(c => c.Name == "NewName");

    Assert.Null(newCat);
  }

  [Fact]
  public async Task AddsUpdatesRemovesCatalogueType()
  {
    var testName = Guid.NewGuid().ToString();
    var testCode = Guid.NewGuid().ToString();
    var ncat = new CatalogueCategory();

    ncat.SetName(testName);
    ncat.SetInternalCode(testCode);

    var catRepo = GetCategoryRepository();

    await catRepo.AddAsync(ncat);

    var newCat = (await catRepo.ListAsync())
                    .FirstOrDefault();

    testName = Guid.NewGuid().ToString();
    testCode = Guid.NewGuid().ToString();
    var nCatType = new CatalogueType();
    nCatType.SetName(testName);
    nCatType.SetInternalCode(testCode);
    nCatType.SetCategory(newCat!, null);
    var nField = new CatalogueTypeField();
    nField.SetMandatory(true);
    nField.SetType(CustomFieldType.Date);
    nField.SetName("Field");

    nCatType.SetFields(new CatalogueTypeField[][]{
      new [] {nField}
    });

    var typeRepo = GetTypeRepository();

    await typeRepo.AddAsync(nCatType);

    var newType = (await typeRepo.ListAsync())
                    .FirstOrDefault();
    Assert.NotNull(newType);

    Assert.Equal(testName, newType.Name);
    Assert.Equal(testCode, newType.InternalCode);
    Assert.Collection(newType.Fields!, line1 =>
    {
      Assert.Collection(line1, element =>
      {
        Assert.Equal("Field", element.Name);
        Assert.True(element.IsMandatory);
        Assert.Equal(CustomFieldType.Date, element.Type);
      });
    });

    Assert.True(newType.Id > 0);

    newType.SetName("NewName");

    await typeRepo.UpdateAsync(newType);

    newType = (await typeRepo.ListAsync())
                    .FirstOrDefault(t => t.Name == "NewName");

    Assert.NotNull(newType);

    await typeRepo.DeleteAsync(newType);

    newType = (await typeRepo.ListAsync())
                    .FirstOrDefault(t => t.Name == "NewName");

    Assert.Null(newType);
  }

  [Fact]
  public async Task AddsUpdatesRemovesTypeAndItem()
  {
    var testName = Guid.NewGuid().ToString();
    var testCode = Guid.NewGuid().ToString();
    var ncat = new CatalogueCategory();

    ncat.SetName(testName);
    ncat.SetInternalCode(testCode);

    var catRepo = GetCategoryRepository();

    await catRepo.AddAsync(ncat);

    var newCat = (await catRepo.ListAsync())
                    .FirstOrDefault();

    Assert.NotNull(newCat);

    testName = Guid.NewGuid().ToString();
    testCode = Guid.NewGuid().ToString();
    var nCatType = new CatalogueType();
    nCatType.SetName(testName);
    nCatType.SetInternalCode(testCode);
    nCatType.SetCategory(newCat!, null);
    var nField = new CatalogueTypeField();
    nField.SetMandatory(true);
    nField.SetType(CustomFieldType.SimpleText);
    nField.SetName("Field");

    nCatType.SetFields(new CatalogueTypeField[][]{
      new [] { nField }
    });

    var typeRepo = GetTypeRepository();

    await typeRepo.AddAsync(nCatType);

    var newType = (await typeRepo.ListAsync())
                    .FirstOrDefault();

    Assert.NotNull(newType);

    var newEstate = await CreateEstate();

    var itemName = Guid.NewGuid().ToString();
    var itemCode = Guid.NewGuid().ToString();

    var newItem = new CatalogueItem();
    newItem.SetType(newType);
    newItem.SetInternalCode(itemCode);
    newItem.SetStatus(EstateStatus.Operational);
    newItem.SetActivationDate(DateOnly.FromDateTime(DateTime.Today));
    newItem.SetLastMaintenanceDate(DateOnly.FromDateTime(DateTime.Today));

    newItem.SetEstate(newEstate);
    newItem.SetFields(Array.Empty<CatalogueItemField>());

    var itemRepo = GetItemRepository();

    await itemRepo.AddAsync(newItem);

    newItem = (await itemRepo.ListAsync(new CatalogueItemIncludeAllSpec()))
      .FirstOrDefault();

    Assert.NotNull(newItem);

    Assert.Equal(itemCode, newItem.InternalCode);
    Assert.True(newItem.Id > 0);

    var fieldValue = new CatalogueItemField();
    fieldValue.SetTemplateTypeId(nField.Id);
    fieldValue.SetIsMandatory(nField.IsMandatory);
    fieldValue.SetName(nField.Name!);
    fieldValue.SetType(nField.Type);
    fieldValue.SetValue("FIELD VALUE");

    newItem.SetFields(new[] { fieldValue });

    await itemRepo.UpdateAsync(newItem);

    newItem = (await itemRepo.ListAsync(new CatalogueItemIncludeAllSpec()))
      .FirstOrDefault();

    Assert.NotNull(newItem);

    Assert.Collection(newItem.Fields, elem =>
    {
      Assert.Equal("Field", elem.Name);
      Assert.True(elem.IsMandatory);
      Assert.Equal(CustomFieldType.SimpleText, elem.Type);
      Assert.Equal("FIELD VALUE", elem.Value);
    });

    await itemRepo.DeleteAsync(newItem);

    newItem = (await itemRepo.ListAsync(new CatalogueItemIncludeAllSpec()))
      .FirstOrDefault(n => n.InternalCode == itemCode);

    Assert.Null(newItem);
  }
}
