import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Sidebar from "../../components/Sidebar";

export default function NotaPagar({ ...props }) {
  const { history, match } = props;

  function voltar() {
    !match.params.id ? history.push("/notahome") : history.push("/notadetalhe");
  }

  return (
    <div className="container-fluid">
      <div className="col-md-12">
        <Sidebar {...props} />
      </div>
      <div className="row justify-content-center mt-5">
        <div class="card text-white bg-dark mb-3" style={{ maxWidth: "22rem" }}>
          <div class="card-header">Realizar Pagamento</div>
          <div class="card-body">
            <h5 class="card-title">Saldo devedor: 5000R$</h5>
            <input
              className="form-control"
              type="text"
              placeholder="Valor do pagamento"
            />
            <br />
            <input className="form-control" type="date" placeholder="Data" />
            <br />
            <div className="row justify-content-center ">
              <div>
                <button className="btn btn-primary" onClick={() => voltar()}>
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
