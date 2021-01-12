// import { v4 as uuidv4 } from 'uuid';

export const moneyFormat = (money: number) => `RM ${money.toFixed(2)}`;

// export const uuid = () => uuidv4();

export const titleFormat = (title: string) => title.charAt(0).toUpperCase() + title.slice(1);