import { createPortal } from "react-dom";
import { ModalContent, ModalOverlay } from "./Modal.sc";
import { DialogSize } from "utils/types";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  size?: DialogSize;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, size }) => {
  if (!isOpen) return null;
  const container = document.getElementById("modal-root");

  return container
    ? createPortal(
        <ModalOverlay>
          <ModalContent $size={size}>{children}</ModalContent>
        </ModalOverlay>,
        container,
      )
    : null;
};

export default Modal;
