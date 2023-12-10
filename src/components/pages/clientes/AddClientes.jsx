import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import { db } from "../../../firebase-config"; // importamos la conexion a firebase
//import app from "../../../firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore"; // importamos los metodos de firebase para agregar, actualizar y eliminar documentos
import Swal from "sweetalert2";
import { useAppStore } from "../../../appStore"; // importamos el store de zustand: useAppStore

export default function AddClientes({ closeEvent }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const setRows = useAppStore((state) => state.setRows); // traer los datos de firebase y guardarlos en rows
  const empCollectionRef = collection(db, "clientes"); // referencia a la coleccion de firebase

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const currencies = [
    {
      value: "STEC",
      label: "STEC",
    },
    {
      value: "INTEL",
      label: "INTEL",
    },
    {
      value: "GOOGLE",
      label: "GOOGLE",
    },
    {
      value: "ATERA",
      label: "ATERA",
    },
    {
      value: "INTECAP",
      label: "INTECAP",
    },
  ];

  const getUsers = async () => {
    // traer los datos de firebase y guardarlos en rows
    const data = await getDocs(empCollectionRef); // getDocs: lee todos los documentos de una colección  getDocs(collection(db, "users"));
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const createProduct = async () => {
    await addDoc(empCollectionRef, {
      name: name,
      phone: Number(phone),
      company: company,
      date: String(new Intl.DateTimeFormat(["ban", "id"]).format(new Date())),
    });
    getUsers();
    closeEvent();
    Swal.fire("Success", "Product Added Successfully", "success");

    //recargar la pagina
    //        window.location.reload();
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Agregar Cliente
      </Typography>
      <IconButton
        style={{ position: "absolute", right: "0", top: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Nombre Cliente"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={name}
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            type="phone"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+502</InputAdornment>
              ),
            }}
            value={phone}
            onChange={handlePhoneChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Company"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={company}
            onChange={handleCompanyChange}
            select
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button
              variant="contained"
              sx={{ minWidth: "100%" }}
              onClick={createProduct}
            >
              Add
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
