import React, { useState, useEffect } from "react";
import { Form, Input } from "unform";
import { formatToTimeZone } from "date-fns-timezone";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

export default function NotaPagar({ ...props }) {
  const [data, setData] = useState({});
  const [cliente, setCliente] = useState();
  const [notas, setNotas] = useState([]);

  const { history, match, location } = props;

  useEffect(() => {
    if (!match.params.id) {
      const { cliente } = location.state;
      setCliente(cliente);
    } else {
      setCliente(data.cliente);
    }
  }, [match.params.id, data.cliente, location.state]);

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (!data.valorAv || !data.data) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          data.cliente = cliente;
          await api.postOrPut("/notascompras", match.params.id, data);
          toastr.success(`Pagamento cadastrado com sucesso!

          `);
          history.push("/notadetalhe", { cliente: data.cliente });
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        data.cliente = cliente;
        await api.postOrPut("/notascompras", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!`);
        history.push("/notadetalhe", { cliente: data.cliente });
      } catch (error) {
        toastr.error(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    async function loadData() {
      if (match.params.id) {
        const { id } = match.params;
        const response = await api.get(`/notascompras/${id}`);

        setData(response.data);
      }
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params, match.params.id]);

  useEffect(() => {
    async function loadNotas() {
      if (match.params.id) {
        const response = await api.get(`/notascompras?cliente=${data.cliente}`);
        setNotas(response.data);
      } else {
        const response = await api.get(`/notascompras?cliente=${cliente}`);
        setNotas(response.data);
      }
    }

    loadNotas();
  }, [data.cliente, match.params.id, cliente]);

  useEffect(
    () => {
      if (match.params.id) {
        const dataNote = formatToTimeZone(data.data, "YYYY-MM-DD", {
          timeZone: "Europe/Berlin"
        });

        setData({
          ...data,
          data: dataNote
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.data, match.params.id]
  );

  function voltar() {
    !match.params.id
      ? history.push("/notahome")
      : history.push("/notadetalhe", { cliente: data.cliente });
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
          <div className="card-header">Realizar Pagamento</div>
          <div className="card-body">
            {notas.map(n => (
              <h5 key={n.saldoDevedor} className="card-title">
                Saldo devedor: {n.saldoDevedor} R$
              </h5>
            ))}
            <Form initialData={data} onSubmit={handlerSubmit}>
              <Input
                className="form-control"
                type="text"
                name="valorAv"
                label="Valor do pagamento *"
                placeholder="Valor do pagamento *"
              />
              <Input
                className="form-control"
                type="date"
                name="data"
                label="Data *"
                placeholder="Data"
              />
              <br />
              <div className="row justify-content-center ">
                <div>
                  <button className="btn btn-primary" onClick={() => voltar()}>
                    Voltar
                  </button>
                  <button type="submit" className="btn btn-primary ml-1">
                    Salvar
                  </button>
                </div>
              </div>
              <br />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
