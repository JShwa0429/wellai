declare module 'type' {
  export type Options = {
    gender: string | null;
    height?: number;
    weight?: number;
    is_core: boolean;
    is_leg: boolean;
    is_back: boolean;
    is_sit: boolean;
    is_stand: boolean;
    is_balance: boolean;
  };
}
declare module '*.png';
declare module '*.jpeg';
// 여러 곳에서 사용할 타입 지정용 공간
