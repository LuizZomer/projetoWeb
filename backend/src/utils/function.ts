type IMessageType = 'create' | 'update' | 'delete';

export const messageGenerator = (msgType: IMessageType) => {
  switch (msgType) {
    case 'create':
      return { message: 'Erfolgreich erstellt!' };
    case 'delete':
      return { message: 'Erfolgreich gelöscht!' };
    case 'update':
      return { message: 'Erfolgreich aktualisiert!' };
  }
};
