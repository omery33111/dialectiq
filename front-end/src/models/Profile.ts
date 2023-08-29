


export default class Profile {
    profile_id: number = 0;
    user: number = 0;
    bio: string = "";
    first_name: string = "";
    last_name: string = "";
    location: string = "";
    picture: string = "";
    }

    

  export interface ProfileState {
    profile: Profile;
  }