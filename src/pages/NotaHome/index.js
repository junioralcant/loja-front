import React, { useEffect, useState } from "react";
import Select from "react-select";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";

import { colorStyle } from "../../styles/select";

export default function NotaHome({ ...props }) {
  const [data, setData] = useState();
  const [clientes, setClientes] = useState();
  const [selectCliente, setSelectCliente] = useState();
  const { history, match } = props;

  useEffect(() => {
    async function loadClientes() {
      const response = await api.get("/clientes");
      setClientes(response.data.docs);
    }

    loadClientes();
  }, []);

  useEffect(() => {
    async function loadCliente() {
      const response = await api.get(`/clientes/${match.params.id}`);
      setClientes([response.data]);
      setSelectCliente(response.data._id);
    }

    if (match.params.id) {
      loadCliente();
    }
  }, [match.params.id]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/clientes/${match.params.id}`);
      setData(response.data);
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params.id]);

  const clienteExistente = data != null && {
    id: data._id,
    nome: data.nome
  };

  function comprar() {
    !selectCliente
      ? toastr.error(`Selecione um cliente.`)
      : history.push("/notacompra", { cliente: selectCliente });
  }

  function pagar() {
    !selectCliente
      ? toastr.error(`Selecione um cliente.`)
      : history.push("/notapagar", { cliente: selectCliente });
  }

  return (
    <div className="container-fluid">
      <div className="col-md-12">
        <Sidebar {...props} />
      </div>
      <div className="row justify-content-center mt-5">
        <div
          className="card text-white bg-dark mb-3"
          style={{ maxWidth: "22rem" }}
        >
          <div className="card-header">Compras</div>
          <div className="card-body">
            <Select
              options={clientes}
              styles={colorStyle}
              placeholder={
                clienteExistente
                  ? clienteExistente.nome
                  : "Selecione um cliente"
              }
              getOptionLabel={cliente => cliente.nome}
              getOptionValue={cliente => cliente._id}
              onChange={value => setSelectCliente(value._id)}
            />
            <br />
            <div className="row justify-content-center">
              <div>
                <button className="btn btn-primary " onClick={() => comprar()}>
                  Comprar
                </button>
                <button
                  className="btn btn-primary ml-1"
                  onClick={() => pagar()}
                >
                  Pagar
                </button>
                <button
                  className="btn btn-primary ml-1"
                  onClick={() => history.push("/notadetalhe")}
                >
                  Detalhes
                </button>
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
