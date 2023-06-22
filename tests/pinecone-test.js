import { PineconeClient } from '@pinecone-database/pinecone';

// -------------------------------------------- //
// --- TESTING PINECONE ONLY (NO LANGCHAIN) --- //
// -------------------------------------------- //

// Initialize Pinecone Client
const PINECONE_ENVIRONMENT = 'us-west4-gcp';
const PINECONE_INDEX_NAME = 'short-filler-data';

async function initPinecone() {
  try {
    const pinecone = new PineconeClient();

    await pinecone.init({
      environment: PINECONE_ENVIRONMENT ?? '', //this is in the dashboard
      apiKey: process.env.PINECONE_API_KEY ?? '',
    });

    return pinecone;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
}

// The init takes time
const pinecone = await initPinecone();
const index = pinecone.Index(PINECONE_INDEX_NAME);

// TIMER START
const t0 = performance.now();

// OPENAI EMBEDDING
const arr = await fetch('https://api.openai.com/v1/embeddings', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'text-embedding-ada-002',
    input: 'test',
  }),
});

if (arr.status !== 200) {
  throw new ApplicationError('Failed to create embedding for question', arr);
}

const {
  data: [{ embedding }],
} = await arr.json();
console.log(embedding);
const t1 = performance.now();

// EMPTY EMBEDDING
// let embedding = new Array(1536).fill(0);

const queryResponse = await index.query({
  queryRequest: {
    vector: embedding,
    topK: 1,
    namespace: '',
    includeValues: true,
    includeMetadata: true,
  },
});
const results = queryResponse.matches;

console.log(`This code took ${t1 - t0} milliseconds.`);
