import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentService } from "src/services";
import { payloadCreator } from "src/utils/utils";

export const getCommentByProductId = createAsyncThunk(
  "comments/getCommentByProductId",
  payloadCreator(commentService.getCommentByProductId),
);

export const getCommentById = createAsyncThunk(
  "comments/getCommentById",
  payloadCreator(commentService.getCommentById),
);

export const postComments = createAsyncThunk(
  "comments/postComments",
  payloadCreator(commentService.postComment),
);

export const putComments = createAsyncThunk(
  "comments/putComments",
  payloadCreator(commentService.putComment),
);
export const uploadManyImages = createAsyncThunk(
  "comments/uploadManyImages",
  payloadCreator(commentService.uploadManyImages),
);

const CommentDetail = {
  code: 200,
  message: "",
  data: {
    id: 12,
    userId: 2,
    username: "",
    userAvatar: "",
    star: 3,
    comment: "",
    feedbackFilesUrl: [],
  },
};

const initialState = {
  commentByProduct: {
    code: 200,
    data: [
      {
        id: 12,
        userId: 2,
        username: "",
        userAvatar: "",
        star: 3,
        comment: "",
        feedbackFilesUrl: [],
      },
    ],
    message: "",
  },
  commentById: CommentDetail,
};
export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentByProductId.fulfilled, (state, { payload }) => {
      state.commentByProduct = payload.data;
    });
    builder.addCase(getCommentById.fulfilled, (state, { payload }) => {
      state.commentById = payload.data;
    });
    // builder.addCase(postComments.fulfilled, (state, { payload }) => {
    //   state.comment = [...state.comment, payload.data];
    // });
  },
});
const commentsReducer = comments.reducer;
export default commentsReducer;

