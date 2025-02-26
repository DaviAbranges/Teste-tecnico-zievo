// modalAtom.ts
import { atom } from 'jotai';
import { IBook } from '../interfaces/books/IBook';

export type ModalType = 'alert' | 'success' | 'error' | 'form';

export interface ModalState {
  open: boolean;
  type: ModalType;
  title: string;
  message?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  formData?: IBook;
}

export const modalAtom = atom<ModalState>({
  open: false,
  type: 'alert',
  title: '',
});
