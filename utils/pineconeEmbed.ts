import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import { PINECONE_INDEX_NAME } from '@/config/pinecone';

export const embedDocs = async (
  namespace?: string,
  fromDocuments?: boolean,
  docs?: any,
  metadata?: Record<string, string>,
): Promise<PineconeStore> => {
  const index = pinecone.Index(PINECONE_INDEX_NAME);
  const embeddings = new OpenAIEmbeddings();

  if (fromDocuments) {
    try {
      console.log('creating vector store...');
      const embeddedDocs = await PineconeStore.fromDocuments(docs, embeddings, {
        namespace: namespace,
        pineconeIndex: index,
        textKey: 'text',
      });
      console.log('Done Upserting to New Index');
      return embeddedDocs;
    } catch (error) {
      console.log('fromDocuments Error:', error);
    }
  } else {
    const embeddedDocs = await PineconeStore.fromExistingIndex(embeddings, {
      namespace: namespace,
      pineconeIndex: index,
      textKey: 'text',
    });
    console.log('Done Retrieving Existing Index');
    return embeddedDocs;
  }
  // Add a return statement here to ensure all possible paths have a return value
  throw new Error("Invalid 'fromDocuments' value provided");
};
