/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
function Header(props) {
  const { googleSignIn, user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="nav">
      <Link to="/">
        <div>Logo</div>
      </Link>
      {user ? (
        <>
          <div>Welcome, {user.displayName}</div>
          <button onClick={handleSignOut}>LogOut</button>
        </>
      ) : (
        <div className="google-btn-container">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      )}
    </nav>
  );
}

export default Header;
