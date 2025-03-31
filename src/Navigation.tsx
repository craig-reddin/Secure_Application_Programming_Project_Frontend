import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const isLoggedIn = sessionStorage.getItem("SignedIn");
  const navigate = useNavigate();

  const signOut = () => {
    sessionStorage.setItem("SignedIn", "false");
    navigate("/");
  };

  return (
    <Navbar expand="lg" id="navbar">
      <Container>
        <Nav className="me-auto">
          <Nav.Link id="navlink" onClick={signOut}>
            Sign Out
          </Nav.Link>
          <Nav.Link as={Link} to="/create" id="navlink">
            Create Account
          </Nav.Link>
          <Nav.Link as={Link} to="/view_all" id="navlink">
            View All
          </Nav.Link>

          <Nav.Link as={Link} to="/" id="navlink">
            Sign In
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
