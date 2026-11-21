import { Modal, Button } from 'react-bootstrap';

type ModalConfirmacionProps = {
  show: boolean;
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  variante?: string;
  onConfirmar: () => void;
  onCancelar: () => void;
};

const ModalConfirmacion = (
  {
    show,
    titulo,
    mensaje,
    textoConfirmar = 'Confirmar',
    variante = 'danger',
    onConfirmar,
    onCancelar,
  } : ModalConfirmacionProps) => 
  {
    return (
      <Modal show={show} onHide={onCancelar} centered>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{mensaje}</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={onCancelar}>
            Cancelar
          </Button>
          <Button variant={variante} onClick={onConfirmar}>
            {textoConfirmar}
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default ModalConfirmacion;
