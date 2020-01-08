import useToggle from './useToggle';

export interface UseModalResult {
  openModal: (nextValue: boolean | undefined) => void;
  visible: boolean;
  closeModal: () => void;
}

export function useModal() {
  const [on, toggle] = useToggle(false);

  const openModal = () => {
    toggle(true);
  };

  const closeModal = () => {
    toggle(false);
  };

  return {
    openModal,
    visible: on,
    closeModal,
  };
}
