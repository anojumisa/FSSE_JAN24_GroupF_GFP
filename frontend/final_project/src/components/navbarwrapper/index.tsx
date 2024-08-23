import { useEffect, useState } from "react";
import LandingNavbar from "../layouts/Landing_Page/Navbar";
import UserNavbar from "../layouts/Dashboard_User/navbar";
import SellerNavbar from "../layouts/Dashboard_Seller/navbar";


const getUserRole = (): "guest" | "user" | "seller" => {
  return localStorage.getItem("role") as "guest" | "user" | "seller" || "guest";
};

export default function NavbarWrapper() {
  const [role, setRole] = useState<"guest" | "user" | "seller">("guest");

  useEffect(() => {
    const role = getUserRole();
    setRole(role);
  }, []);

  if (role === "user") {
    return <UserNavbar username="User" />; 
  } else if (role === "seller") {
    return <SellerNavbar storeName="Store" />; 
  } else {
    return <LandingNavbar />;
  }
}
