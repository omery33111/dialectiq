


export interface Change {
    id: string;
    first_name: string;
    last_name: string;
  }
  
  export interface ChangeState {
    changes: Change[];
    change: Change;
  }
