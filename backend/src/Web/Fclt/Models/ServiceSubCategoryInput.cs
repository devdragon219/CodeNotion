using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public class ServiceSubCategoryInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public string? Name { get; set; }
  public string InternalCode { get; set; } = default!;
}
