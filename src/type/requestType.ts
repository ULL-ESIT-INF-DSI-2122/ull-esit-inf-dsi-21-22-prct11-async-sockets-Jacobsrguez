import {Color} from '../nota';
/**
 * Tipo de dato que representa los elementos de una nota.
 */
export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: Color;
}
