


export interface Blog {
    id: string;
    title: string;
    description: string;
    youtube: string;
    // video: string;
    picture: string;
    date: Date;
    }
  
  
    export interface BlogState {
      singleBlog: Blog
      blogs: Blog[]

      blogAmount: number;

      isLoading: boolean;
      isError: boolean;
    };