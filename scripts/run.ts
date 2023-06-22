import { createPineconeVectorStore } from './ingest-data-to-pinecone';
import { createWeaviateVectorStore } from './ingest-data-to-weaviate';

export const run = async () => {
  try {
    try {
      // await createPineconeVectorStore('filler-labels');
      await createWeaviateVectorStore('filler-labels');
      // await createVectorStore('cutoff-labels');
    } catch (error) {
      console.log('Error during createVectorStore:', error);
      throw Error('Failed to complete createVectorStore');
    }
  } catch (error) {
    console.log('error', error);
    throw Error('Failed to complete workflow');
  }
};

(async () => {
  console.time('Upserting Workflow Runtime');
  await run();
  console.log('Worflow complete');
  console.timeEnd('Upserting Workflow Runtime');
})();
