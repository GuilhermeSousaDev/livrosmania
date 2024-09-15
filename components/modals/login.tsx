import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle';

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

function LoginModal({ isOpen, onOpenChange }: LoginModalProps) {
  return (
    <Modal
      className="p-6 rounded-lg shadow-lg"
      isOpen={isOpen}
      size="2xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalBody className="flex flex-col items-center gap-6 py-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Bem-vindo! Faça login para continuar
          </h2>
          <Button
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 hover:shadow-md transition duration-200 rounded-lg py-2"
            color="primary"
            variant="light"
            onPress={() => signIn('google')}
          >
            <FaGoogle className="mr-2 text-red-500" />
            <span className="text-gray-200 font-medium">Login com Google</span>
          </Button>
          {/* <Button
            className="w-full flex items-center justify-center gap-2 bg-black border border-gray-300 hover:border-gray-400 hover:shadow-md transition duration-200 rounded-lg py-2"
            color="secondary"
            variant="light"
            onPress={() => signIn('github')}
          >
            <FaGithub className="mr-2 text-white" />
            <span className="text-white font-medium">Login com GitHub</span>
          </Button> */}
        </ModalBody>

        <ModalFooter className="flex flex-col items-center gap-3">
          <p className="text-xs text-gray-400 text-center px-4">
            Ao fazer login, você concorda com nossos termos de serviço e
            política de privacidade.
          </p>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
