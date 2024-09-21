import { ChatData, ChatMessage, ChatState, ChatType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Initial state for the chat slice of the Redux store
 * @author Sriram Sundar
 *
 * @type {ChatState}
 */
const initialState: ChatState = {
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  isLoading: false,
  error: null,
};

/**
 * Chat slice for Redux store to manage chat state in the frontend application
 * This slice handles operations related to chat selection, messages, loading state, and errors
 * @author Sriram Sundar
 */
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChatType: (
      state,
      action: PayloadAction<ChatType | undefined>
    ) => {
      state.selectedChatType = action.payload;
    },
    setSelectedChatData: (
      state,
      action: PayloadAction<ChatData | undefined>
    ) => {
      state.selectedChatData = action.payload;
    },
    setSelectedChatMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.selectedChatMessages = action.payload;
    },
    addChatMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.selectedChatMessages.push(action.payload);
    },
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    closeChat: (state) => {
      state.selectedChatData = undefined;
      state.selectedChatType = undefined;
      state.selectedChatMessages = [];
      state.error = null;
    },
  },
});

/**
 * Action creators for modifying the chat state
 * These functions can be dispatched to update the chat state in the Redux store
 * @author Sriram Sundar
 */
export const {
  setSelectedChatType,
  setSelectedChatData,
  setSelectedChatMessages,
  addChatMessage,
  updateChatMessage,
  setLoading,
  setError,
  closeChat,
} = chatSlice.actions;

export default chatSlice.reducer;

/**
 * Selector to get the currently selected chat data from the Redux store
 * @author Sriram Sundar
 *
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {ChatData | undefined} The currently selected chat data
 */
export const selectCurrentChat = (state: { chat: ChatState }) =>
  state.chat.selectedChatData;

/**
 * Selector to get the messages of the currently selected chat from the Redux store
 * @author Sriram Sundar
 *
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {ChatMessage[]} An array of chat messages for the selected chat
 */
export const selectChatMessages = (state: { chat: ChatState }) =>
  state.chat.selectedChatMessages;

/**
 * Selector to get the loading state of chat operations from the Redux store
 * @author Sriram Sundar
 *
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {boolean} The loading state of chat operations
 */
export const selectChatLoading = (state: { chat: ChatState }) =>
  state.chat.isLoading;

/**
 * Selector to get any error related to chat operations from the Redux store
 * @author Sriram Sundar
 *
 * @param {{ chat: ChatState }} state - The Redux state
 * @returns {string | null} The error message, if any, or null
 */
export const selectChatError = (state: { chat: ChatState }) => state.chat.error;
