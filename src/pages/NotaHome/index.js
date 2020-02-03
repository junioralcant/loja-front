import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Sidebar from "../../components/Sidebar";

export default function NotaHome({ ...props }) {
  const { history } = props;

  return (
    <div className="container-fluid">
      <div className="col-md-12">
        <Sidebar {...props} />
      </div>
      <div className="row justify-content-center mt-5">
        <div class="card text-white bg-dark mb-3" style={{ maxWidth: "22rem" }}>
          <div class="card-header">Compras</div>
          <div class="card-body">
            <input
              className="form-control"
              type="text"
              placeholder="Nome do cliente"
            />
            <br />
            <div className="row justify-content-center">
              <div>
                <button
                  className="btn btn-primary "
                  onClick={() => history.push("/notacompra")}
                >
                  Comprar
                </button>
                <button
                  className="btn btn-primary ml-1"
                  onClick={() => history.push("/notapagar")}
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
