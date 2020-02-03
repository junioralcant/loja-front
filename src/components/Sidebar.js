import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { logout } from "../services/auth";

export default function Sidebar({ history }) {
  function sair() {
    logout();
    history.push("/");
  }
  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="navbar-brand" to="/clientes">
          Christian Calçados <span className="sr-only">(current)</span>
        </Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item ">
            <Link className="nav-link" to="/clientes/create">
              Cadastrar Cliente <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/clientes">
              Listar Clientes <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
        <button className="btn btn btn-danger my-2 my-sm-0" onClick={sair}>
          Sair
        </button>
      </div>
    </div>
  );
}
