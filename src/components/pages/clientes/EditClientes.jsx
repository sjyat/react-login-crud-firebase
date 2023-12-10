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
import {
  collection,
  updateDoc,
  addDoc,
  getDocs,
  doc,
} from "firebase/firestore"; // importamos los metodos de firebase para agregar, actualizar y eliminar documentos
import Swal from "sweetalert2";
import { useAppStore } from "../../../appStore"; // importamos el store de zustand

export default function EditClientes({ fid, closeEvent }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [company, setCompany] = useState("");
  const setRows = useAppStore((state) => state.setRows); // traer los datos de firebase y guardarlos en rows
  const empCollectionRef = collection(db, "clientes"); // referencia a la coleccion de firebase

  useEffect(() => {
    console.log("FID: ", fid.id);
    //destructuring
    setName(fid.name);
    setPhone(fid.phone);
    setCompany(fid.company);
  }, []);

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
      value: "INTECAP",
      label: "INTECAP",
    },
    {
      value: "INTEL",
      label: "INTEL",
    },
    {
      value: "ATERA",
      label: "ATERA",
    },
    {
      value: "GOOGLE",
      label: "GOOGLE",
    },
  ];

  const getUsers = async () => {
    // traer los datos de firebase y guardarlos en rows
    const data = await getDocs(empCollectionRef); // getDocs: lee todos los documentos de una colección  getDocs(collection(db, "users"));
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const udateProduct = async () => {
    //actualizar
    const userDoc = doc(db, "clientes", fid.id); // referencia al documento de firebase del usuario id: fid.id
    const newFields = {
      name: name,
      phone: Number(phone),
      company: company,
      date: String(new Intl.DateTimeFormat(["ban", "id"]).format(new Date())),
    };
    await updateDoc(userDoc, newFields); // userDoc: referencia al documento de firebase del usuario id: fid.id
    getUsers();
    closeEvent();
    Swal.fire(
      "Actualizado ",
      "El Registro ha sido Actualizado con éxito ",
      "success"
    );
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Editar Clientes...
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
            label="Product Name"
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
              onClick={udateProduct}
            >
              Save
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
