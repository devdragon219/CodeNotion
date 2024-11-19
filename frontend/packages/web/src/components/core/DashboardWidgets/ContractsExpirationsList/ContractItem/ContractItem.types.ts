export interface ContractItemProps {
  contract: {
    contractId: number;
    internalCode: string;
    contractType: string;
    subject: string;
    daysToExpiration: number;
    amount: number;
  };
  isActive: boolean;
  useMockData?: boolean;
}
