import weaviate, { WeaviateClient, ApiKey } from 'weaviate-ts-client';

if (!process.env.WEAVIATE_API_KEY) {
  throw new Error('Weaviate api key var missing');
}
if (!process.env.COHERE_API_KEY) {
  throw new Error('Cohere api key var missing');
}
if (!process.env.HUGGINGFACE_API_KEY) {
  throw new Error('Huggingface api key var missing');
}
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OpenAI api key var missing');
}

// host: 'short-filler-data-ay7br9fq.weaviate.network', // Free tier
export const weaviateClient: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: 'x63xnlagsggr2yemkqyc9a.gcp-a.weaviate.cloud', // Paid tier
  apiKey: new ApiKey(process.env.WEAVIATE_API_KEY),
  headers: {
    'X-Cohere-Api-Key': process.env.COHERE_API_KEY,
    'X-HuggingFace-Api-Key': process.env.HUGGINGFACE_API_KEY,
    'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY,
  },
});
