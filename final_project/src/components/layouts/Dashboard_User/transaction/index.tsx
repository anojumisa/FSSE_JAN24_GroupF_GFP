import { Transaction } from '../../../../types/user/types';

interface TransactionListProps {
  transaction: Transaction;
}

const TransactionList: React.FC<TransactionListProps> = ({ transaction }) => (
  <div className="transaction-container border p-4 mb-4 bg-amber-400">
    <div className="transaction-item">Transaction ID: {transaction.id}</div>
    <div className="transaction-item">Amount: {transaction.total_price}</div>
    <div className="transaction-item">Date: {transaction.created_at}</div>
    <div> Status: {transaction.status}</div>
  </div>
);

export default TransactionList;
