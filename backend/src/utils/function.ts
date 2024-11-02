import { IOrderInfo } from 'src/revenue/revenue.service';

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

export const loyaltyPointsCheck = (orderInfo: IOrderInfo['orderInfo']) => {
  const numberArray = orderInfo.map((o) => {
    switch (o.type) {
      case 'drink':
        return 10 * o.quantity;
      case 'noodle':
        return 45 * o.quantity;
      case 'pizza':
        return 50 * o.quantity;
      case 'salad':
        return 40 * o.quantity;
    }
  });

  return numberArray.reduce((total, actual) => total + actual, 0);
};
