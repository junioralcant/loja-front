import React, { useState, useEffect } from "react";
import { Form, Input } from "unform";
import { formatToTimeZone } from "date-fns-timezone";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";

export default function NotaComprar({ ...props }) {
  const [data, setData] = useState({});
  const [cliente, setCliente] = useState();

  const { history, location, match } = props;

  useEffect(() => {
    if (!match.params.id) {
      const { cliente } = location.state;
      setCliente(cliente);
    } else {
      setCliente(data.cliente);
    }
  }, [match.params.id, data.cliente, location.state]);

  console.log(cliente);

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (!data.valorCompra || !data.data) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          data.cliente = cliente;
          await api.postOrPut("/notascompras", match.params.id, data);
          toastr.success(`Compra cadastrado com sucesso!

          `);
          history.push("/notahome");
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        data.cliente = cliente;
        await api.postOrPut("/notascompras", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!`);
        history.push("/notahome");
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
          <div className="card-header">Realizar Compra</div>
          <div className="card-body">
            <Form initialData={data} onSubmit={handlerSubmit}>
              <Input
                className="form-control"
                type="text"
                name="valorCompra"
                label="Valor da Compra  *"
              />
              <Input
                className="form-control"
                type="date"
                label="Data *"
                name="data"
              />
              <br />
              <Input
                className="form-control"
                type="text"
                placeholder="Vendedor"
                name="vendedor"
              />
              <br />
              <Input
                className="form-control"
                type="text"
                placeholder="Observação"
                name="observacao"
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
