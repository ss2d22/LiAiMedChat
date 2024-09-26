import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatOpenAI } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

/**
 * Create a history-aware retriever for the given vector store and LLM.
 * @author Sriram Sundar
 *
 * @async
 * @param {FaissStore} vectorStore
 * @param {ChatOpenAI} llm
 * @param {ChatPromptTemplate} contextualizeQPrompt
 * @returns {unknown}
 */
export const createHistoryRetriever = async (
  vectorStore: FaissStore,
  llm: ChatOpenAI,
  contextualizeQPrompt: ChatPromptTemplate
) => {
  const retriever = vectorStore.asRetriever({ k: 3 });
  return await createHistoryAwareRetriever({
    llm,
    retriever,
    rephrasePrompt: contextualizeQPrompt,
  });
};

/**
 * Create the QA chain and retrieval chain.
 * @author Sriram Sundar
 *
 * @async
 * @param {ChatOpenAI} llm
 * @param {ChatPromptTemplate} qaPrompt
 * @param {Awaited<ReturnType<typeof createHistoryAwareRetriever>>} historyRetriever
 * @returns {ReturnType<typeof createRetrievalChain>}
 */
export const createQAChain = async (
  llm: ChatOpenAI,
  qaPrompt: ChatPromptTemplate,
  historyRetriever: Awaited<ReturnType<typeof createHistoryAwareRetriever>>
): ReturnType<typeof createRetrievalChain> => {
  const questionAnswerChain = await createStuffDocumentsChain({
    llm,
    prompt: qaPrompt,
  });

  return await createRetrievalChain({
    retriever: historyRetriever,
    combineDocsChain: questionAnswerChain,
  });
};
