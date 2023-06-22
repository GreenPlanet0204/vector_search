import * as fs from 'fs';
import { HierarchicalNSW } from 'hnswlib-node';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

// Your function to convert query into vector
async function convertQueryToVector(query: string): Promise<number[]> {
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
    throw new Error(`Failed to create embedding for question: ${arr}`);
  }

  const {
    data: [{ embedding }],
  } = await arr.json();

  console.log(embedding);
  return embedding;
}

class VectorSearch {
  private hnsw: any;
  private numDimensions = 1536; // the length of data point vector that will be indexed.
  private maxElements = 10000; // the maximum number of data points.

  constructor() {
    // declaring and intializing index.
    const index = new HierarchicalNSW('cosine', this.numDimensions);
    this.hnsw = index.initIndex(this.maxElements);
  }

  async loadData(filePath: string): Promise<void> {
    // Read JSON file
    const data = JSON.parse(await readFile(filePath, 'utf-8'));

    // Assume data is an array of objects with "id" and "vector" properties
    for (let item of data) {
      this.hnsw.insert(item.vector, item.id);
    }
    // inserting data points to index.
    for (let i = 0; i < this.maxElements; i++) {
      const point = new Array(this.numDimensions);
      for (let j = 0; j < this.numDimensions; j++) {
        point[j] = Math.random();
      }
      this.hnsw.index.addPoint(point, i);
    }

    // saving index.
    this.hnsw.index.writeIndexSync('foo.dat');
  }

  search(query: string): any {
    // Turn query into vector
    const vector = convertQueryToVector(query);

    // Conduct similarity search
    return this.hnsw.search(vector, 10);
  }
}

const vectorSearch = new VectorSearch();
vectorSearch
  .loadData('./docs/filler-labelled-JSONs/your-file.json')
  .then(() => {
    const results = vectorSearch.search('your search query');
    console.log(results);
  })
  .catch(console.error);
