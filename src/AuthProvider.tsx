import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Create the context
const AuthContext = createContext<any>(null);

// Hook to use authentication
export const useAuth = () => {
  return useContext(AuthContext);
};

//  AuthProvider interface
interface AuthProviderProps {
  children: ReactNode;
}

// Create AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialise authentication state from sessionStorage value
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("SignedIn") === "true";
  });

  useEffect(() => {
    // Function to update isAuthenticated when sessionStorage changes - enforcing IsAuthenticated to
    const handleStorageChange = () => {
      setIsAuthenticated(sessionStorage.getItem("SignedIn") === "true");
    };

    // Listen for storage changes in case another tab updates sessionStorage
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    // return  is Authenticated and setIsAuthenticate to all child components
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
