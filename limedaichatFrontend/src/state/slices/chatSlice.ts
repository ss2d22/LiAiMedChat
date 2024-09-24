import { ChatData, ChatMessage, ChatState, ChatType, Textbook } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Initial state for the chat slice of the Redux store
 * @author Sriram Sundar
 */
const initialState: ChatState = {
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  textbooks: [],
  isUploading: false,
  fileUploadProgress: 0,
  isDownloading: false,
  downloadProgress: 0,
  isLoading: false,
  error: null,
};

/**
 * Chat slice for Redux store to manage chat state in the frontend application
 * This slice handles operations related to chat selection, messages, textbooks, file operations, loading state, and errors
 * @author Sriram Sundar
 */
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    /**
     * Sets the selected chat type
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<ChatType | undefined>} action - The chat type to set
     */
    setSelectedChatType: (
      state,
      action: PayloadAction<ChatType | undefined>
    ) => {
      state.selectedChatType = action.payload;
    },

    /**
     * Sets the selected chat data
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<ChatData | undefined>} action - The chat data to set
     */
    setSelectedChatData: (
      state,
      action: PayloadAction<ChatData | undefined>
    ) => {
      state.selectedChatData = action.payload;
    },

    /**
     * Sets the messages for the selected chat
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<ChatMessage[]>} action - The messages to set
     */
    setSelectedChatMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.selectedChatMessages = action.payload;
    },

    /**
     * Adds a new chat message to the selected chat
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<ChatMessage>} action - The message to add
     */
    addChatMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.selectedChatMessages.push(action.payload);
    },

    /**
     * Updates an existing chat message
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<{ id: string; updates: Partial<ChatMessage> }>} action - The message updates
     */
    updateChatMessage: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<ChatMessage> }>
    ) => {
      const index = state.selectedChatMessages.findIndex(
        (msg) => msg.id === action.payload.id
      );
      if (index !== -1) {
        state.selectedChatMessages[index] = {
          ...state.selectedChatMessages[index],
          ...action.payload.updates,
        };
      }
    },

    /**
     * Sets the list of available textbooks
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<Textbook[]>} action - The textbooks to set
     */
    setTextbooks: (state, action: PayloadAction<Textbook[]>) => {
      state.textbooks = action.payload;
    },

    /**
     * Adds a new textbook to the list
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<Textbook>} action - The textbook to add
     */
    addTextbook: (state, action: PayloadAction<Textbook>) => {
      state.textbooks.unshift(action.payload);
    },

    /**
     * Sets the uploading state for file operations
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<boolean>} action - The uploading state to set
     */
    setIsUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },

    /**
     * Sets the progress of file upload
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<number>} action - The upload progress to set
     */
    setFileUploadProgress: (state, action: PayloadAction<number>) => {
      state.fileUploadProgress = action.payload;
    },

    /**
     * Sets the downloading state for file operations
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<boolean>} action - The downloading state to set
     */
    setIsDownloading: (state, action: PayloadAction<boolean>) => {
      state.isDownloading = action.payload;
    },

    /**
     * Sets the progress of file download
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<number>} action - The download progress to set
     */
    setDownloadProgress: (state, action: PayloadAction<number>) => {
      state.downloadProgress = action.payload;
    },

    /**
     * Sets the loading state for chat operations
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<boolean>} action - The loading state to set
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /**
     * Sets the error state for chat operations
     * @param {ChatState} state - The current chat state
     * @param {PayloadAction<string | null>} action - The error message to set
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    /**
     * Closes the current chat and resets related state
     * @param {ChatState} state - The current chat state
     */
    closeChat: (state) => {
      state.selectedChatData = undefined;
      state.selectedChatType = undefined;
      state.selectedChatMessages = [];
      state.error = null;
    },
  },
});

export const {
  setSelectedChatType,
  setSelectedChatData,
  setSelectedChatMessages,
  addChatMessage,
  updateChatMessage,
  setTextbooks,
  addTextbook,
  setIsUploading,
  setFileUploadProgress,
  setIsDownloading,
  setDownloadProgress,
  setLoading,
  setError,
  closeChat,
} = chatSlice.actions;

export default chatSlice.reducer;

/**
 * Selector to get the currently selected chat data from the Redux store
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {ChatData | undefined} The currently selected chat data
 */
export const selectCurrentChat = (state: { chat: ChatState }) =>
  state.chat.selectedChatData;

/**
 * Selector to get the messages of the currently selected chat from the Redux store
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {ChatMessage[]} An array of chat messages for the selected chat
 */
export const selectChatMessages = (state: { chat: ChatState }) =>
  state.chat.selectedChatMessages;

/**
 * Selector to get the loading state of chat operations from the Redux store
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {boolean} The loading state of chat operations
 */
export const selectChatLoading = (state: { chat: ChatState }) =>
  state.chat.isLoading;

/**
 * Selector to get any error related to chat operations from the Redux store
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {string | null} The error message, if any, or null
 */
export const selectChatError = (state: { chat: ChatState }) => state.chat.error;

/**
 * Selector to get the type of the currently selected chat from the Redux store
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {ChatType | undefined} The type of the currently selected chat
 */
export const selectChatType = (state: { chat: ChatState }) =>
  state.chat.selectedChatType;

/**
 * Selector to get the list of textbooks from the Redux store
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {Textbook[]} An array of textbooks
 */
export const selectTextbooks = (state: { chat: ChatState }) =>
  state.chat.textbooks;

/**
 * Selector to get the uploading state for file operations from the Redux store
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {boolean} The uploading state
 */
export const selectIsUploading = (state: { chat: ChatState }) =>
  state.chat.isUploading;

/**
 * Selector to get the file upload progress from the Redux store
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {number} The file upload progress
 */
export const selectFileUploadProgress = (state: { chat: ChatState }) =>
  state.chat.fileUploadProgress;

/**
 * Selector to get the downloading state for file operations from the Redux store
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {boolean} The downloading state
 */
export const selectIsDownloading = (state: { chat: ChatState }) =>
  state.chat.isDownloading;

/**
 * Selector to get the file download progress from the Redux store
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {number} The file download progress
 */
export const selectDownloadProgress = (state: { chat: ChatState }) =>
  state.chat.downloadProgress;
