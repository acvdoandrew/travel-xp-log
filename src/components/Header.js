import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
function Header(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <div>Logo</div>
      </Link>
      <div>Welcome, Username!</div>
    </nav>
  );
}

export default Header;
