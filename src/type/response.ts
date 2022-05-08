import {Note} from '../nota';
export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: Boolean;
  notes?: Note[];
}
