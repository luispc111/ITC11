import { PUBLIC_URL, BACKEND_URL } from "../utils";
import deleteIcon from "../../assets/delete_white_24dp.svg";
import axios from "axios";

async function eliminarPlanificado(plan, addToast) {
  const confirmMessage = `Se eliminará el plan planificado: ${plan.nombre}. ¿Continuar?`;
  if (!window.confirm(confirmMessage)) return;

  const resDelete = await axios
    .delete(`${BACKEND_URL}/planificados/${plan._id}`)
    .catch((err) => err);
  if (resDelete instanceof Error) {
    addToast(`Error: ${resDelete.response.data.msg}`, {
      appearance: 'error',
      autoDismiss: true,
    });
  }
  addToast(`Error: ${resDelete.data.msg}`, {
    appearance: 'error',
    autoDismiss: true,
  });
  window.location.reload();
}

export default function Planificado({ plan, addToast }) {
  return (
    <figure className="planificado-summary bg-secondary">
      <a
        href={`${PUBLIC_URL}/#/plan/${plan.siglas}`}
        target="_blank"
        rel="noreferrer"
        className="plan-content text-left flex-grow-1"
      >
        <p className="nombre">{plan.nombre}</p>
        <p className="siglas">{plan.siglas}</p>
      </a>
      <div className="d-flex icons-container">
        <button onClick={() => eliminarPlanificado(plan, addToast)} className="delete-button">
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
    </figure>
  )
}
