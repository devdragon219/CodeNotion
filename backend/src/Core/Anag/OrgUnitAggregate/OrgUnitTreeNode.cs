namespace RealGimm.Core.Anag.OrgUnitAggregate;

public record OrgUnitTreeNode(int Id, string? Name, bool IsSubject, IEnumerable<OrgUnitTreeNode>? Children = null);
