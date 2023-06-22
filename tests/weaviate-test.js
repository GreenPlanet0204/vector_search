import weaviate, { ApiKey } from 'weaviate-ts-client';

if (!process.env.WEAVIATE_API_KEY) {
  throw new Error('Weaviate api key var missing');
}
// if (!process.env.COHERE_API_KEY) {
//   throw new Error('Cohere api key var missing');
// }
// if (!process.env.HUGGINGFACE_API_KEY) {
//   throw new Error('Huggingface api key var missing');
// }
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OpenAI api key var missing');
}

// console.log(process.env.WEAVIATE_API_KEY);

const weaviateClient = weaviate.client({
  scheme: 'https',
  // host: 'short-filler-data-ay7br9fq.weaviate.network',
  host: 'x63xnlagsggr2yemkqyc9a.gcp-a.weaviate.cloud', // Paid tier
  apiKey: new ApiKey(process.env.WEAVIATE_API_KEY),
  headers: {
    // 'X-Cohere-Api-Key': process.env.COHERE_API_KEY,
    // 'X-HuggingFace-Api-Key': process.env.HUGGINGFACE_API_KEY,
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY,
  },
});

async function nearTextQuery() {
  const res = await weaviateClient.graphql
    .get()
    .withClassName('ShortFillers')
    .withFields(
      'pageContent fillerID fillerText category _additional{certainty distance}',
    )
    .withNearText({ concepts: ['my wife left me'] })
    .withLimit(1)
    .do();

  console.log(JSON.stringify(res, null, 2));
  return res;
}

const t0 = performance.now();
await nearTextQuery();
const t1 = performance.now();
console.log(`This code took ${t1 - t0} milliseconds.`);
