export interface IAlert {
  type: 'warning' | 'success' | 'danger';
  message: string;
  id: string;
}
