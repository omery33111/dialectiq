


export default class Profile {
    profile_id: number = 0;
    user: number = 0;
    bio: string = "";
    first_name: string = "";
    last_name: string = "";
    location: string = "";
    picture: string = "";
    points: number = 0;
    date: Date = new Date();
    }

    

  export interface ProfileState {
    profile: Profile;

    userID: string;

    user_blogs: [
      {id: number;
        blog_info: {
      title: string;
      description: string;
      picture: string;
      date: string;};
        comments: string[];}
    ]

    user_quizes: [
      {description: string;
      subject_name: string;
      picture: string;}
  ]
  }

  
