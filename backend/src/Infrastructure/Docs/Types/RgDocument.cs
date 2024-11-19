using PortCMIS.Data;
using RealGimm.Core;
using RealGimm.Core.Docs.DocumentAggregate;

namespace RealGimm.Infrastructure.Docs.Types;

public class RgDocument : DocumentTypeDefinition
{
  public RgDocument()
  {
    AddPropertyDefinition(
        MakeSingleProperty<PropertyStringDefinition>(
            CmisTypes.RG_OWNER_ID,
            p =>
            {
              p.MaxLength = StrFieldSizes.EXTERNAL_CODE;
              p.PropertyType = PortCMIS.Enums.PropertyType.String;
            }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyStringDefinition>(
            CmisTypes.RG_FILE_NAME,
            p =>
            {
              p.MaxLength = StrFieldSizes.NAME;
              p.PropertyType = PortCMIS.Enums.PropertyType.String;
            }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyStringDefinition>(
            CmisTypes.RG_TENANT_ID,
            p =>
            {
              p.MaxLength = StrFieldSizes.EXTERNAL_CODE;
              p.PropertyType = PortCMIS.Enums.PropertyType.String;
            }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyStringDefinition>(
            CmisTypes.RG_ESTATE_ID,
            p =>
            {
              p.MaxLength = StrFieldSizes.EXTERNAL_CODE;
              p.PropertyType = PortCMIS.Enums.PropertyType.String;
            }));

    AddPropertyDefinition(
        MakeMultipleProperty<PropertyStringDefinition>(
                CmisTypes.RG_MANAGEMENT_SUBJECT_ID,
                p =>
                {
                  p.MaxLength = StrFieldSizes.EXTERNAL_CODE;
                  p.PropertyType = PortCMIS.Enums.PropertyType.String;
                }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyStringDefinition>(
            CmisTypes.RG_ISSUER_CODE,
            p =>
            {
              p.MaxLength = StrFieldSizes.EXTERNAL_CODE;
              p.PropertyType = PortCMIS.Enums.PropertyType.String;
            }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyStringDefinition>(
            CmisTypes.RG_ISSUER_NAME,
            p =>
            {
              p.MaxLength = StrFieldSizes.NAME;
              p.PropertyType = PortCMIS.Enums.PropertyType.String;
            }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyStringDefinition>(
            CmisTypes.RG_ISSUE_DATE,
            p =>
            {
              p.PropertyType = PortCMIS.Enums.PropertyType.DateTime;
            }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyStringDefinition>(
            CmisTypes.RG_PROTOCOL_NUMBER,
            p =>
            {
              p.MaxLength = StrFieldSizes.EXTERNAL_CODE;
              p.PropertyType = PortCMIS.Enums.PropertyType.String;
            }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyStringDefinition>(
            CmisTypes.RG_CONTENT_CATEGORY,
            p =>
            {
              p.MaxLength = StrFieldSizes.EXTERNAL_CODE;
              p.Choices = EnumChoices<ContentCategory>();
              p.PropertyType = PortCMIS.Enums.PropertyType.String;
            }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyStringDefinition>(
            CmisTypes.RG_CONTENT_TYPE,
            p =>
            {
              p.MaxLength = StrFieldSizes.EXTERNAL_CODE;
              p.Choices = EnumChoices<ContentType>();
              p.PropertyType = PortCMIS.Enums.PropertyType.String;
            }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyDateTimeDefinition>(
            CmisTypes.RG_VALID_SINCE,
            p =>
            {
              p.PropertyType = PortCMIS.Enums.PropertyType.DateTime;
            }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyDateTimeDefinition>(
            CmisTypes.RG_VALID_UNTIL,
            p =>
            {
              p.PropertyType = PortCMIS.Enums.PropertyType.DateTime;
            }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyStringDefinition>(
            CmisTypes.RG_UPLOADER_NAME,
            p =>
            {
              p.MaxLength = StrFieldSizes.NAME;
              p.PropertyType = PortCMIS.Enums.PropertyType.String;
            }));

    AddPropertyDefinition(
        MakeSingleProperty<PropertyStringDefinition>(
            CmisTypes.RG_NOTES,
            p =>
            {
              p.MaxLength = StrFieldSizes.NOTES;
              p.PropertyType = PortCMIS.Enums.PropertyType.String;
            }));

    ParentTypeId = "cmis:document";
    Id = CmisTypes.RG_DOCUMENT;
    LocalNamespace = "http://grupposcai.it/model/realgimm/content/1.0";
    LocalName = nameof(CmisTypes.RG_DOCUMENT);
    DisplayName = nameof(CmisTypes.RG_DOCUMENT);
    ContentStreamAllowed = PortCMIS.Enums.ContentStreamAllowed.Allowed;
    IsVersionable = true;
    IsFulltextIndexed = true;
  }

  private static IList<IChoice<string>> EnumChoices<E>() where E : struct, Enum
  {
    return Enum.GetNames<E>()
    .Select(v => (IChoice<string>)new Choice<string>
    {
      Value = new[] { v },
      DisplayName = v,
    }).ToList();
  }

  private static T MakeSingleProperty<T>(string id, Action<T> init) where T : PropertyDefinition, new()
  {
    var displayName = "RG "
        + string.Join(" ", (id.Contains(':') ? id.Split(':')[1] : id)
            .Split('-'));
    var t = new T
    {
      QueryName = id,
      LocalName = id,
      Id = id,
      DisplayName = displayName,
      IsRequired = false,
      IsInherited = false,
      IsOrderable = false,
      IsQueryable = true,
      Updatability = PortCMIS.Enums.Updatability.ReadWrite,
      Cardinality = PortCMIS.Enums.Cardinality.Single
    };

    init(t);

    return t;
  }

  private static T MakeMultipleProperty<T>(string id, Action<T> init) where T : PropertyDefinition, new()
  {
    var displayName = "RG "
        + string.Join(" ", (id.Contains(':') ? id.Split(':')[1] : id)
            .Split('-'));
    var t = new T
    {
      QueryName = id,
      LocalName = id,
      Id = id,
      DisplayName = displayName,
      IsRequired = false,
      IsInherited = false,
      IsOrderable = false,
      IsQueryable = true,
      Updatability = PortCMIS.Enums.Updatability.ReadWrite,
      Cardinality = PortCMIS.Enums.Cardinality.Multi
    };

    init(t);

    return t;
  }
}
