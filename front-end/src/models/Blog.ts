


export interface Blog {
    id: string;
    title: string;
    description: string;
    video: string;
    picture: string;
    date?: Date;
    }
  
  
    export interface BlogState {
      singleBlog: Blog
      blogs: Blog[]
      likes: Record<string, number>;
    };