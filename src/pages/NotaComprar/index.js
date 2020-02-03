import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Sidebar from "../../components/Sidebar";

export default function NotaComprar({ ...props }) {
  const { history } = props;

  return (
    <div className="container-fluid">
      <div className="col-md-12">
        <Sidebar {...props} />
      </div>
      <div className="row justify-content-center mt-5">
        <div class="card text-white bg-dark mb-3" style={{ maxWidth: "22rem" }}>
          <div class="card-header">Realizar Compra</div>
          <div class="card-body">
            <input
              className="form-control"
              type="text"
              placeholder="Valor da compra"
            />
            <br />
            <input className="form-control" type="date" placeholder="Data" />
            <br />
            <input
              className="form-control"
              type="text"
              placeholder="Vendedor"
            />
            <br />
            <input
              className="form-control"
              type="text"
              placeholder="Observação"
            />
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
