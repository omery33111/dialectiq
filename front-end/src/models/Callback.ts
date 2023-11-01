


export interface Callback {
    id: string;
    name: string;
    email: string;
  }
  
  export interface CallbackState {
    callbacks: Callback[];

    callbackAmount: number;
  }