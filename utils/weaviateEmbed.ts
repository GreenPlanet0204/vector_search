import { ObjectsBatcher } from 'weaviate-ts-client';
import { weaviateClient } from '@/utils/weaviate-client';
import {
  openaiClassObject,
  huggingClassObject,
  cohereClassObject,
} from '@/utils/weaviate-schema';

async function addSchema(embeddingModel: string) {
  if (embeddingModel === 'openai') {
    // Instantiate the client with the auth config
    const res = await weaviateClient.schema
      .classCreator()
      .withClass(openaiClassObject)
      .do();
    console.log(res);
    return 'OpenAI';
  } else if (embeddingModel === 'huggingface') {
    // Instantiate the client with the auth config
    const res = await weaviateClient.schema
      .classCreator()
      .withClass(huggingClassObject)
      .do();
    console.log(res);
    return 'HuggingFace';
  } else if (embeddingModel === 'cohere') {
    // Instantiate the client with the auth config
    const res = await weaviateClient.schema
      .classCreator()
      .withClass(cohereClassObject)
      .do();
    console.log(res);
    return 'Cohere';
  } else {
    throw new Error('Not a valid embedding model');
  }
}

// const modelType = await addSchema('openai');
// console.log(modelType);

let classObj = {
  class: 'ShortFillers',
  vectorizer: 'text2vec-openai',
};

const res = await weaviateClient.schema.classCreator().withClass(classObj).do();
console.log(res);

export const embedDocsToWeaviate = async (docs: any[]) => {
  // Prepare a batcher
  let batcher: ObjectsBatcher = weaviateClient.batch.objectsBatcher();
  let counter = 0;
  let batchSize = 100;

  for (const item of docs) {
    // Construct an object with a class and properties 'pageContent' and 'metadata'
    const obj = {
      class: `ShortFillers`,
      properties: {
        pageContent: item.pageContent,
        fillerID: item.metadata.fillerID,
        fillerText: item.metadata.fillerText,
        category: item.metadata.category,
      },
    };

    // add the object to the batch queue
    batcher = batcher.withObject(obj);

    // When the batch counter reaches batchSize, push the objects to Weaviate
    if (counter++ == batchSize) {
      // flush the batch queue
      const res = await batcher.do();
      console.log(res);

      // restart the batch queue
      counter = 0;
      batcher = weaviateClient.batch.objectsBatcher();
    }
  }

  // Flush the remaining objects
  const res = await batcher.do();
  console.log(res);
};
