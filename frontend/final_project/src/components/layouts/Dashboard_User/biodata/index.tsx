import { User } from '../../../../../types/user';

interface BiodataProps {
  user: User;
}

const Biodata: React.FC<BiodataProps> = ({ user }) => (
  <div>
    <h2>{user.first_name} {user.last_name}</h2>
    <p>Email: {user.email}</p>
    <p>Address: {user.address}, {user.city}, {user.state}, {user.zip_code}</p>
  </div>
);

export default Biodata;
