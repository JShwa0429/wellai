declare module 'type' {
  export type OptionType = {
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

  export type ReviewType = {
    id: string;
    user_id: string;
    created_at: string;
    modified_at: string;
    content: string;
    rating: number;
    course_id: string;
  };
}
declare module '*.png';
declare module '*.jpeg';
// 여러 곳에서 사용할 타입 지정용 공간
