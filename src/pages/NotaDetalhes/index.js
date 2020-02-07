import React, { useState, useEffect } from "react";
import { IoIosTrash, IoMdCreate } from "react-icons/io";
import { Link } from "react-router-dom";
import { formatToTimeZone } from "date-fns-timezone";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

export default function NotaDetalhes({ ...props }) {
  const [notas, setNotas] = useState([]);
  const { history, location } = props;
  const id = location.state.cliente;

  useEffect(() => {
    async function loadNotas() {
      const response = await api.get(`/notascompras?cliente=${id}`);
      setNotas(response.data);
    }

    loadNotas();
  }, [id]);

  return (
    <div className="container-fluid">
      <div className="col-md-12">
        <Sidebar {...props} />
      </div>
      <div className="row justify-content-center mt-5">
        <div
          className="card text-white bg-dark mb-3"
          style={{ maxWidth: "50rem" }}
        >
          <div className="card-header">Detalhes</div>
          <div className="card-body">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>Pagamentos/Compra</th>
                  <th>Data</th>
                  <th>Vendedor</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {notas.map(nota => {
                  return nota.notaCompra.map(nc => {
                    var amarelo = "";
                    var url = "";
                    if (nc.valorCompra > 0 && nc.valorAv <= 0) {
                      amarelo = "yellow";
                      url = "notacompra";
                    } else {
                      amarelo = "#48A60B";
                      url = "notapagar";
                    }

                    const dataNota = formatToTimeZone(nc.data, "DD-MM-YYYY", {
                      timeZone: "Europe/Berlin"
                    });

                    return (
                      <tr key={nc._id} style={{ color: amarelo }}>
                        <td>
                          {nc.valorCompra > 0 && nc.valorAv <= 0
                            ? nc.valorCompra
                            : nc.valorAv}{" "}
                          R$
                        </td>
                        <td>{dataNota}</td>
                        <td>{nc.vendedor}</td>
                        <td>
                          <Link to={`/${url}/${nc._id}`}>
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
                    );
                  });
                })}
              </tbody>
            </table>
            <br />
            {notas.map(n => (
              <h5 key={n.saldoDevedor} className="card-title">
                Saldo devedor: {n.saldoDevedor} R$
              </h5>
            ))}
            <br />
            <div className="row justify-content-center ">
              <div>
                <button
                  className="btn btn-primary "
                  onClick={() => history.push("/notahome")}
                >
                  Voltar
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
