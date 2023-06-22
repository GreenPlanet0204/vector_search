import type { NextApiRequest, NextApiResponse } from 'next';
import { embedDocs } from '@/utils/pineconeEmbed';
// import { pinecone } from '@/utils/pinecone-client';
// import { allShortFillers } from '@/utils/fillers/shortFillers';
// import { allLongFillers } from '@/utils/fillers/longFillers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { question, history } = req.body;
  console.log('question', question);

  //only accept post requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }

  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

  try {
    // const hrStart = process.hrtime();
    // console.time('Pinecone Timer');
    const vectorStore = await embedDocs('', false);

    const t00 = performance.now();
    const query = await vectorStore.embeddings.embedQuery(sanitizedQuestion);
    const t11 = performance.now();

    const t0 = performance.now();
    // V1 Langchain code (remove comment and then comment V2)
    // const result = await vectorStore.similaritySearch(sanitizedQuestion, 1);

    // V2 Pinecone code
    // const index = pinecone.Index("short-filler-data")
    const result = await vectorStore.pineconeIndex.query({
      queryRequest: {
        includeMetadata: true,
        namespace: '',
        topK: 1,
        vector: query,
      },
    });
    const results: any = result.matches;

    const t1 = performance.now();
    // console.timeEnd('Pinecone Timer');
    // const hrEnd = process.hrtime(hrStart);
    // console.info('Execution time (hr): %ds %dms', hrEnd[0], hrEnd[1] / 1000000);

    console.log(`This embedding code took ${t11 - t00} milliseconds.`);
    console.log(`This db query code took ${t1 - t0} milliseconds.`);
    console.log(`The total time is ${t11 - t00 + t1 - t0} milliseconds.`);

    const response = `${results[0].metadata.fillerText} (Category:${results[0].metadata.category} | ID:${results[0].metadata.fillerID} | TRAINING: ${results[0].pageContent})`;
    console.log(response);

    let history: any[] = [];
    for (let i of results) {
      let prospectStatement = i.pageContent;
      let content = i.metadata.fillerText;
      let id = i.metadata.fillerText;

      history.push({
        content: prospectStatement,
        filler: `(${id}) ${content}`,
      });
    }
    console.log(history);

    const data = { response: response, sourceDocs: history };

    res.status(200).json(data);
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
