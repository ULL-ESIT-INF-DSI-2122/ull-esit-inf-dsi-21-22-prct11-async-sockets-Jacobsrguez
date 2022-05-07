export type ResponseType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    success: boolean;
    notes?: Note[];
  }
  