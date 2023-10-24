import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdministratorState } from "../../models/Administrator";
import { deleteAmerican, deleteAmericanSubject, deleteBlog, deleteSentence, deleteSentenceSubject, deleteVoice, deleteVoiceSubject, getAmericanSubjects, getAmericansOfSubject, getSingleAmericanSubject, getSingleSentenceSubject, getSingleVoiceSubject, patchAmerican, patchAmericanSubject, patchBlog, patchSentence, patchSentenceSubject, patchVoice, patchVoiceSubject, postAmerican, postAmericanSubject, postBlog, postSentence, postSentenceSubject, postVoice, postVoiceSubject } from "./administratorAPI";
import { RootState } from "../../app/store";
import { AmericanSubject } from "../../models/AmericanSubject";
import { SentenceSubject } from "../../models/SentenceSubject";
import { VoiceSubject } from "../../models/VoiceSubject";



const initialState: AdministratorState = {
  blogs: [],
  singleBlog: { title: "", description: "", youtube: "", video: "", id: "", picture: "", date: new Date() },

  american: {
    subject: {id: "", subject_name: ""}, id: "", question: "", answer1: "", answer2: "", answer3: "", answer4: "", correct_answer: 0
  },
  americans: [],

  subject: { id: "", description: "", subject_name: "", picture: ""},
  subjects: [{ id: "", description: "", subject_name: "", picture: ""}],
  subjectAmericans: [],

  americanAnswer: {id: "", user: 0, user_answer: 0, question: 0},
  americanAnswers: [],

  sentence: {
    subject: {id: "", subject_name: ""}, id: "", question: "", correct_answer: ""},
  sentences: [],

  voice: {
    subject: {id: "", subject_name: ""}, id: "", question: "", correct_answer: ""},
  voices: [],
};



export const postBlogAsync = createAsyncThunk(
    'administrator/postBlog',
    async (blogData: any) => {
    const response = await postBlog(blogData);
    return response.data;
  }
);



export const postAmericanAsync = createAsyncThunk(
    'administrator/postAmerican',
    async (americanData: any) => {
    const response = await postAmerican(americanData);
    return response.data;
  }
);



export const postSentenceAsync = createAsyncThunk(
    'administrator/postSentence',
    async (sentenceData: any) => {
    const response = await postSentence(sentenceData);
    return response.data;
  }
);



export const postVoiceAsync = createAsyncThunk(
    'administrator/postVoice',
    async (voiceData: any) => {
    const response = await postVoice(voiceData);
    return response.data;
  }
);



export const patchBlogAsync = createAsyncThunk(
  'administrator/patchBlog',
  async (data: {blogData: any, id: string}) => {
  const response = await patchBlog(data.blogData, data.id);
  return response;
}
)



export const patchVoiceAsync = createAsyncThunk(
  'administrator/patchVoice',
  async (data: {voiceData: any, id: string}) => {
  const response = await patchVoice(data.voiceData, data.id);
  return response;
}
)



export const patchSentenceAsync = createAsyncThunk(
  'administrator/patchSentence',
  async (data: {sentenceData: any, id: string}) => {
  const response = await patchSentence(data.sentenceData, data.id);
  return response;
}
)



export const patchAmericanAsync = createAsyncThunk(
  'administrator/patchAmerican',
  async (data: {americanData: any, id: string}) => {
  const response = await patchAmerican(data.americanData, data.id);
  return response;
}
)



export const deleteAmericanAsync = createAsyncThunk(
  'administrator/deleteAmerican',
  async (id: string) => { await deleteAmerican(id);
  return { id };
  }
);



export const deleteSentenceAsync = createAsyncThunk(
  'administrator/deleteSentence',
  async (id: string) => { await deleteSentence(id);
  return { id };
  }
);



export const deleteVoiceAsync = createAsyncThunk(
  'administrator/deleteVoice',
  async (id: string) => { await deleteVoice(id);
  return { id };
  }
);



export const deleteBlogAsync = createAsyncThunk(
  'administrator/deleteBlog',
  async (id: string) => { await deleteBlog(id);
  return { id };
  }
);



export const postAmericanSubjectAsync = createAsyncThunk(
  'administrator/postAmericanSubject',
  async (AmericanSubjectData: AmericanSubject) => {
      const response = await postAmericanSubject(AmericanSubjectData);
      return response.data;
  }
);



export const postSentenceSubjectAsync = createAsyncThunk(
  'administrator/postSentenceSubject',
  async (SentenceSubjectData: SentenceSubject) => {
      const response = await postSentenceSubject(SentenceSubjectData);
      return response.data;
  }
);



export const postVoiceSubjectAsync = createAsyncThunk(
  'administrator/postVoiceSubject',
  async (voiceSubjectData: VoiceSubject) => {
      const response = await postVoiceSubject(voiceSubjectData);
      return response.data;
  }
);



export const patchVoiceSubjectAsync = createAsyncThunk(
  'administrator/patchVoiceSubject',
  async (data: {subjectData: any, id: string}) => {
  const response = await patchVoiceSubject(data.subjectData, data.id);
  return response;
}
)



export const patchSentenceSubjectAsync = createAsyncThunk(
  'administrator/patchSentenceSubject',
  async (data: {subjectData: any, id: string}) => {
  const response = await patchSentenceSubject(data.subjectData, data.id);
  return response;
}
)



export const patchAmericanSubjectAsync = createAsyncThunk(
  'administrator/patchAmericanSubject',
  async (data: {subjectData: any, id: string}) => {
  const response = await patchAmericanSubject(data.subjectData, data.id);
  return response;
}
)



export const getAmericanSubjectsAsync = createAsyncThunk(
  'administrator/getAmericanSubjects',
  async () => {
    const response = await getAmericanSubjects();
    return response.data;
  }
);



export const getSingleAmericanSubjectAsync = createAsyncThunk(
  'administrator/getSingleAmericanSubject',
  async (id: string) => {
    const response = await getSingleAmericanSubject(id);
    return response.data;
  }
);



export const getSingleSentenceSubjectAsync = createAsyncThunk(
  'administrator/getSingleSentenceSubject',
  async (id: string) => {
    const response = await getSingleSentenceSubject(id);
    return response.data;
  }
);



export const getSingleVoiceSubjectAsync = createAsyncThunk(
  'administrator/getSingleVoiceSubject',
  async (id: string) => {
    const response = await getSingleVoiceSubject(id);
    return response.data;
  }
);



export const deleteAmericanSubjectAsync = createAsyncThunk(
  'administrator/deleteAmericanSubject',
  async (id: string) => { await deleteAmericanSubject(id);
  return { id };
  }
);



export const deleteVoiceSubjectAsync = createAsyncThunk(
  'administrator/deleteVoiceSubject',
  async (id: string) => { await deleteVoiceSubject(id);
  return { id };
  }
);



export const deleteSentenceSubjectAsync = createAsyncThunk(
  'administrator/deleteSentenceSubject',
  async (id: string) => { await deleteSentenceSubject(id);
  return { id };
  }
);



export const getAmericansOfSubjectAsync = createAsyncThunk(
  'administrator/getAmericansOfSubject',
  async (id: string) => {
    const response = await getAmericansOfSubject(id);
    return response.data;
  }
);



  export const administratorSlice = createSlice({
    name: 'administrator',
    initialState,
    reducers: {
      do: (state) => {
      },
  
      },
    extraReducers: (builder) => {
      builder
        .addCase(postBlogAsync.fulfilled, (state, action) => {
            state.blogs = [...state.blogs, action.payload];
        })

        .addCase(postAmericanAsync.fulfilled, (state, action) => {
            state.americans = [...state.americans, action.payload];
        })

        .addCase(postSentenceAsync.fulfilled, (state, action) => {
            state.sentences = [...state.sentences, action.payload];
        })

        .addCase(postVoiceAsync.fulfilled, (state, action) => {
            state.voices = [...state.voices, action.payload];
        })

        .addCase(patchAmericanAsync.fulfilled, (state, action) => {
          state.american = { ...state.american, ...action.payload }
        })

        .addCase(patchSentenceAsync.fulfilled, (state, action) => {
          state.sentence = { ...state.sentence, ...action.payload }
        })

        .addCase(patchVoiceAsync.fulfilled, (state, action) => {
          state.voice = { ...state.voice, ...action.payload }
        })

        .addCase(deleteVoiceAsync.fulfilled, (state, action) => {
          state.voices = state.voices.filter(sentence => sentence.id !== action.payload.id)
        })

        .addCase(deleteSentenceAsync.fulfilled, (state, action) => {
          state.sentences = state.sentences.filter(sentence => sentence.id !== action.payload.id)
        })

        .addCase(deleteAmericanAsync.fulfilled, (state, action) => {
          state.americans = state.americans.filter(american => american.id !== action.payload.id)
        })

        .addCase(patchBlogAsync.fulfilled, (state, action) => {
          state.singleBlog = { ...state.singleBlog, ...action.payload }
        })


        .addCase(deleteBlogAsync.fulfilled, (state, action) => {
          state.blogs = state.blogs.filter(blog => blog.id !== action.payload.id)
        })

        .addCase(postAmericanSubjectAsync.fulfilled, (state, action) => {
          state.subjects = [...state.subjects, action.payload];
        })

        .addCase(postSentenceSubjectAsync.fulfilled, (state, action) => {
          state.subjects = [...state.subjects, action.payload];
        })

        .addCase(postVoiceSubjectAsync.fulfilled, (state, action) => {
          state.subjects = [...state.subjects, action.payload];
        })

        .addCase(patchVoiceSubjectAsync.fulfilled, (state, action) => {
          state.subject = { ...state.subject, ...action.payload }
        })

        .addCase(patchSentenceSubjectAsync.fulfilled, (state, action) => {
          state.subject = { ...state.subject, ...action.payload }
        })

        .addCase(patchAmericanSubjectAsync.fulfilled, (state, action) => {
          state.subject = { ...state.subject, ...action.payload }
        })

        .addCase(getAmericanSubjectsAsync.fulfilled, (state, action) => {
          state.subjects = action.payload;
        })

        .addCase(getSingleAmericanSubjectAsync.fulfilled, (state, action) => {
          state.subject = action.payload
        })

        .addCase(getSingleSentenceSubjectAsync.fulfilled, (state, action) => {
          state.subject = action.payload
        })

        .addCase(getSingleVoiceSubjectAsync.fulfilled, (state, action) => {
          state.subject = action.payload
        })

        .addCase(deleteAmericanSubjectAsync.fulfilled, (state, action) => {
          state.subjects = state.subjects.filter(subject => subject.id !== action.payload.id)
        })

        .addCase(deleteSentenceSubjectAsync.fulfilled, (state, action) => {
          state.subjects = state.subjects.filter(subject => subject.id !== action.payload.id)
        })

        .addCase(deleteVoiceSubjectAsync.fulfilled, (state, action) => {
          state.subjects = state.subjects.filter(subject => subject.id !== action.payload.id)
        })

        
        .addCase(getAmericansOfSubjectAsync.fulfilled, (state, action) =>
        {
          state.subjectAmericans = action.payload
        })
    },
  });




export const selectSingleBlog = (state: RootState) => state.administrator.singleBlog;

export const selectSigleAmerican = (state: RootState) => state.administrator.american;
export const selectAmericans = (state: RootState) => state.administrator.americans;

export const selectSingleSubjectOfSentence = (state: RootState) => state.administrator.subject;

export const selectSingleSubjectOfVoice = (state: RootState) => state.administrator.subject;

export const selectAllSubjectsOfAmerican = (state: RootState) => state.administrator.subjects;
export const selectSingleSubjectOfAmerican = (state: RootState) => state.administrator.subject;
export const selectSubjectAmericans = (state: RootState) => state.administrator.subjectAmericans;


export default administratorSlice.reducer;