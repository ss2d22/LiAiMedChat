import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";

/**
 * Load the vector store for a given textbook.
 * @author Sriram Sundar
 *
 * @async
 * @param vectorStorePath - The path to the vector store.
 * @returns {Promise<FaissStore>} A FaissStore instance.
 */
export const loadVectorStore = async (
  vectorStorePath: string
): Promise<FaissStore> => {
  return await FaissStore.loadFromPython(
    vectorStorePath,
    new OpenAIEmbeddings()
  );
};
