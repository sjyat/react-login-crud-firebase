import NavBar from "../../nav/NavBar";
import SideNav from "../../nav/SideNav";
import Box from "@mui/material/Box";
import ProductList from "./ClientesList";

export default function Clientes() {
  return (
    <>
      <NavBar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ProductList />
        </Box>
      </Box>
    </>
  );
}
