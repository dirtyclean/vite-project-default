import { installUseModal } from './useModal';
import type { App } from 'vue';

export { useModal, type ModalInstance } from './useModal';

export const install = (app: App) => {
  installUseModal(app);
};

export default install;
