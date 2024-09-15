import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  onOpenChange,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Deseja deletar esse livro?
              </ModalHeader>
              <ModalBody>
                <p>Após confirmar esta ação, não será possível revertê-la</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={onConfirm}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
