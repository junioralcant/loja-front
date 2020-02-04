import React from "react";
import { IoIosTrash, IoMdCreate } from "react-icons/io";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import Sidebar from "../../components/Sidebar";

export default function NotaDetalhes({ ...props }) {
  const { history } = props;

  return (
    <div className="container-fluid">
      <div className="col-md-12">
        <Sidebar {...props} />
      </div>
      <div className="row justify-content-center mt-5">
        <div class="card text-white bg-dark mb-3" style={{ maxWidth: "22rem" }}>
          <div class="card-header">Detalhes</div>
          <div class="card-body">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>Pagamentos/Compra</th>
                  <th>Data</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ color: "yellow" }}>
                  <td>130 R$</td>
                  <td>12-03-2019</td>
                  <td>
                    <Link to={`/notapagar/1`}>
                      <IoMdCreate />
                    </Link>
                    <Link
                      to="#"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Desaja excluir nota do cliente Junior Marques ?`
                          )
                        )
                          console.log("Excluido");
                      }}
                    >
                      <IoIosTrash />
                    </Link>
                  </td>
                </tr>
                <tr style={{ color: "yellow" }}>
                  <td>150 R$</td>
                  <td>12-03-2019</td>
                  <td>
                    <Link to={`/notapagar/34234123`}>
                      <IoMdCreate />
                    </Link>
                    <Link
                      to="#"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Desaja excluir nota do cliente Junior Marques ?`
                          )
                        )
                          console.log("Excluido");
                      }}
                    >
                      <IoIosTrash />
                    </Link>
                  </td>
                </tr>

                <tr style={{ color: "#66ff66" }}>
                  <td>150 R$</td>
                  <td>12-03-2019</td>
                  <td>
                    <Link to={`/notapagar/12341234`}>
                      <IoMdCreate />
                    </Link>
                    <Link
                      to="#"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Desaja excluir nota do cliente Junior Marques ?`
                          )
                        )
                          console.log("Excluido");
                      }}
                    >
                      <IoIosTrash />
                    </Link>
                  </td>
                </tr>

                <tr style={{ color: "#66ff66" }}>
                  <td>150 R$</td>
                  <td>12-03-2019</td>
                  <td>
                    <Link to={`/notapagar/12341`}>
                      <IoMdCreate />
                    </Link>
                    <Link
                      to="#"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Desaja excluir nota do cliente Junior Marques ?`
                          )
                        )
                          console.log("Excluido");
                      }}
                    >
                      <IoIosTrash />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <h5 className="card-title">Saldo devedor: 100R$</h5>
            <br />
            <div className="row justify-content-center ">
              <div>
                <button
                  className="btn btn-primary "
                  onClick={() => history.push("/notahome")}
                >
                  Voltar
                </button>
                <button className="btn btn-primary ml-1">Salvar</button>
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
