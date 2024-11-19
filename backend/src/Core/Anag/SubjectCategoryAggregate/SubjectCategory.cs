using System.ComponentModel.DataAnnotations;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Anag.SubjectCategoryAggregate;

public class SubjectCategory : EntityBase, IAggregateRoot
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; }
  public DateTime CreationDate { get; private set; }
  public CategoryFunction Function { get; private set; }

  private readonly List<Subject> _subjects = new();
  public IReadOnlyList<Subject> Subjects => _subjects.AsReadOnly();

  public SubjectCategory(string name, CategoryFunction function)
  {
    if (string.IsNullOrEmpty(name)) throw new ArgumentNullException(nameof(name));
    Name = name;
    CreationDate = DateTime.UtcNow;
    Function = function;
  }

  public void UpdateName(string newName)
  {
    if (string.IsNullOrEmpty(newName)) throw new ArgumentNullException(nameof(newName));

    Name = newName;
  }

  public void UpdateFunction(CategoryFunction newFunction)
  {
    //Perform any required checks
    Function = newFunction;
  }
}
