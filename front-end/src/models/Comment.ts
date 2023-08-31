


export interface Comment {
    id: string;
    blog: string;
    user: string;
    profile: {
      id: number,
      user: number,
      bio: string
      location: string
      picture: string
      first_name: string
      last_name: string
    }
    comment: string;
    date: Date;
  }
  
  export interface CommentState {
    comments: Comment[];
    comment: Comment;
  }