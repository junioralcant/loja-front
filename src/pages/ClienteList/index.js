import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { parseFromTimeZone, formatToTimeZone } from "date-fns-timezone";

import { IoIosTrash, IoMdAddCircleOutline, IoMdCreate } from "react-icons/io";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Sidebar from "../../components/Sidebar";

import "bootstrap/dist/css/bootstrap.min.css";

import api from "../../services/api";
import "./styles.css";

export default function ClienteList({ ...props }) {
  const { history } = props;
  const [clientes, setClientes] = useState([]);
  const [clienteExclusao, setClienteExclusao] = useState({ nome: null });

  const [clientesInfo, setClientesInfo] = useState({});
  const [pagina, setPagina] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadClientes(page = pagina) {
      const response = await api.get(`/clientes?page=${page}`);
      const { docs, ...clientesResto } = response.data;
      setClientes(docs);
      setClientesInfo(clientesResto);
    }

    loadClientes();
  }, [pagina]);

  function removeCliente(cliente) {
    api.delete(`/clientes/${cliente._id}`);
    setTimeout(() => {
      history.go(0); // atualiza a página
    }, 1000);
  }

  async function filtroNome(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/clientes?nome=${e.target.value}`);
      setClientes(response.data.docs);
    } else {
      const response = await api.get("/clientes");
      setClientes(response.data.docs);
    }
  }

  async function filtroApelido(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/clientes?apelido=${e.target.value}`);
      setClientes(response.data.docs);
    } else {
      const response = await api.get("/clientes");
      setClientes(response.data.docs);
    }
  }

  async function filtroCpf(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/clientes?cpf=${e.target.value}`);
      setClientes(response.data.docs);
    } else {
      const response = await api.get("/clientes");
      setClientes(response.data.docs);
    }
  }

  async function filtroRg(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/clientes?rg=${e.target.value}`);
      setClientes(response.data.docs);
    } else {
      const response = await api.get("/clientes");
      setClientes(response.data.docs);
    }
  }

  function anteriorPagina() {
    if (pagina === 1) return; // if for a ultima página

    const numeroDePaginas = pagina - 1;

    setPagina(numeroDePaginas);
  }

  function proximaPagina() {
    if (pagina === clientesInfo.pages) return; // if for a ultima página

    const numeroDePaginas = pagina + 1;

    setPagina(numeroDePaginas);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalExcluir = cliente => {
    setClienteExclusao(cliente);
    handleClickOpen();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Sidebar {...props} />
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Exclusão de clientes"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja excluir o(a) cliente {clienteExclusao.nome} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => removeCliente(clienteExclusao)}
            color="primary"
          >
            Sim
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Não
          </Button>
        </DialogActions>
      </Dialog>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3">
            <br />
            <input
              className="form-control"
              type="text"
              name="filtro"
              id="filtro-input"
              placeholder="Pesquisar por Nome"
              onChange={filtroNome}
            />
          </div>

          <div className="col-md-3">
            <br />
            <input
              className="form-control"
              type="text"
              name="filtro"
              id="filtro-input"
              placeholder="Pesquisar por Apelido"
              onChange={filtroApelido}
            />
          </div>

          <div className="col-md-3">
            <br />
            <input
              className="form-control"
              type="text"
              name="filtro"
              id="filtro-input"
              placeholder="Pesquisar por CPF"
              onChange={filtroCpf}
            />
          </div>

          <div className="col-md-3">
            <br />
            <input
              className="form-control"
              type="text"
              name="filtro"
              id="filtro-input"
              placeholder="Pesquisar por RG"
              onChange={filtroRg}
            />
          </div>
        </div>
        <div className="row col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Apelido</th>
                <th>CPF</th>
                <th>RG</th>
                <th>Data Nascimento</th>
                <th>Data Nascimento</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>Endereço</th>
                <th>Casa</th>
                <th>Loja</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => {
                const dataNas = parseFromTimeZone(cliente.dataNascimento, {
                  timeZone: "America/Sao_Paulo"
                });

                const dataNascimento = formatToTimeZone(dataNas, "DD/MM/YYYY", {
                  timeZone: "Europe/Berlin"
                });

                return (
                  <tr key={cliente._id}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.apelido}</td>
                    <td>{cliente.cpf}</td>
                    <td>{cliente.rg}</td>
                    <td>{dataNascimento}</td>
                    <td>{cliente.dataNasc}</td>
                    <td>{cliente.telefone}</td>
                    <td>{cliente.cidade}</td>
                    <td>{cliente.endereco}</td>
                    <td>{cliente.casa}</td>
                    <td>{cliente.usuario}</td>
                    <td>
                      <Link
                        className="linkTable"
                        to={`/clientes/edit/${cliente._id}`}
                      >
                        <IoMdCreate />
                      </Link>
                      <Link
                        className="linkTable"
                        to={`/clientes/show/${cliente._id}`}
                      >
                        <IoMdAddCircleOutline />
                      </Link>

                      <Link
                        style={{ marginTop: 10 }}
                        className="linkTable"
                        to="#"
                        onClick={() => modalExcluir(cliente)}
                      >
                        <IoIosTrash />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-md-12">
          <div className="btnProAnt">
            <button onClick={anteriorPagina} className="btn btn-success">
              Anterior
            </button>
            <p className="footerPage">
              Clientes: <strong>{clientesInfo.total}</strong>
            </p>
            <p className="footerPage">
              Número de páginas: <strong>{clientesInfo.pages}</strong>
            </p>
            <p className="footerPage">
              Página: <strong>{pagina}</strong>
            </p>
            <button onClick={proximaPagina} className="btn btn-success">
              Próximo
            </button>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
