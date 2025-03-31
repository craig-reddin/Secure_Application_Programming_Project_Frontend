import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; 

function Navigation() {
  // Used to navigate to pages
  const navigate = useNavigate();
  //hook to determine if used is signed in or not
  const { isAuthenticated, setIsAuthenticated } = useAuth(); 
  //fuction to sign oyut user
  const signOut = () => {
    //removed stored variable to change is isAuthenticated to false
    sessionStorage.removeItem("SignedIn");
    //This is to ensure isAuthenticated is false as session storage updated state does not rerender until next mount.
    setIsAuthenticated(false); 
    //Navigate to the default route - sign-in page.
    navigate("/");
  };

  return (
    //bootstrap navbar used 
    <Navbar expand="lg" id="navbar">
      <Container>
        <Nav className="me-auto">
          {/* use isAutenticated to determine what navigation menu should be displaye
           depending on if the useer is signed in or not.*/}
          {isAuthenticated ? (
            <>
            {/* SIgned In Navigation links */}
              <Nav.Link id="navlink" onClick={signOut}>
                Sign Out
              </Nav.Link>
              <Nav.Link as={Link} to="/create" id="navlink">
                Create Account
              </Nav.Link>
              <Nav.Link as={Link} to="/view_all" id="navlink">
                View All
              </Nav.Link>
            </>
          ) : (
            // Signed out Navigation menu
            <Nav.Link as={Link} to="/" id="navlink">
              Sign In
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
