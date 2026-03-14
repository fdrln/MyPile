import { Modal } from "@mantine/core";

interface AddModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function AddModal({ opened, onClose }: AddModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Add to Pile">
      <p>Test</p>
    </Modal>
  );
}
