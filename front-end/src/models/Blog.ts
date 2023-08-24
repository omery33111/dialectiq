


export interface Blog {
    id?: string;
    title: string;
    description: string;
    video: string;
    date?: Date;
    }
  
  
    export interface BlogState {
      singleBlog: Blog
      blogs: Blog[]
    };