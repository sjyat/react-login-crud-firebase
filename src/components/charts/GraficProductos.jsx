import React from "react";
import { Chart } from "react-google-charts";
import { Productos } from "../../db/Categorias.js";

export default function GraficProductos() {
  const chartData = [
    ["Nombre", "precio"],
    ...Productos.map((item) => [item.nombre, item.precio]), // ... es un spread operator que permite expandir un array
  ];

  const options = {
    title: "Equipos de Tecnología",
  };

  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={options}
      width={"100%"}
      height={"250px"}
    />
  );
}
