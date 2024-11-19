export interface ContractActionsProps {
  isContractActive: boolean;
  isContractPaused?: boolean;
  onBillingPause?: () => void;
  onContractRelease?: () => void;
  onContractVariation?: () => void;
  onCounterpartVariation?: () => void;
}
