import { Transaction } from '../../../../../types/user';

interface TransactionListProps {
  transaction: Transaction;
}

const TransactionList: React.FC<TransactionListProps> = ({ transaction }) => (
  <div className="transaction border p-4 mb-4">
    <p>Transaction ID: {transaction.id}</p>
    <p>Amount: {transaction.amount}</p>
    <p>Date: {transaction.date}</p>
  </div>
);

export default TransactionList;
