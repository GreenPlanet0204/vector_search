import { embedDocs } from '../utils/pineconeEmbed';
import { allShortFillers } from '@/utils/fillers/shortFillers';

// IGNORE THIS CODE - THIS IS PURELY FOR TESTING AND ISN'T BEING USED ANYWHERE IN THE APP

// retrieve the data from pinecone & query it
const vectorStore = await embedDocs('', false);
console.time('Pinecone Timer');
const results = await vectorStore.similaritySearchWithScore(
  'Im not sure you know what that is',
  1,
  // {
  // foo: "bar",
  // }
);
console.timeEnd('Pinecone Timer');

// -----------------------------
// 'results' return value: An Array of single-object Arrays
// [
//   [
//     {
//       pageContent: "Whatever the Prospect said",
//       metadata: {
//         fillerID: 6,
//         fillerText: 'Okay - gotcha'
//         category: 'A'
//       }
//     }
//   ],
//   [
//     {
//       pageContent: "Whatever the Prospect said",
//       metadata: {
//         fillerID: 6,
//         fillerText: 'Okay - gotcha'
//         category: 'A'
//       }
//     }
//   ]
// ]
// -----------------------------

// You can just use results[0][0].metadata.fillerText to get the text string of the filler
console.log(results[0][0].metadata.fillerText);
console.log(results[0][0].metadata.fillerID);

// console.log(results[1][0].metadata.fillerText);
// console.log(results[1][0].metadata.fillerID);

// console.log(results[2][0].metadata.fillerText);
// console.log(results[2][0].metadata.fillerID);
// etc.

// ===================== //
// IGNORE THE CODE BELOW //
// ===================== //

// Retrieve the Filler from local for the highest-score match
let text = '';
let category = '';
let fillerID = 0;
for (let i of allShortFillers) {
  if (i.metadata.fillerID === results[0][0].metadata.fillerID) {
    text = i.pageContent;
    category = i.metadata.category;
    fillerID = i.metadata.fillerID;
  }
}
const response = `(Cat:${category}-ID${fillerID}): ${text}`;
console.log(response);

// Retrieve the Filler from local for all the Top_K Matches
let history: string[] = [];
for (let i of results) {
  let prospectStatement = i[0].pageContent;
  let content = '';
  for (let item of allShortFillers) {
    if (item.metadata.fillerID === results[0][0].metadata.fillerID) {
      content = item.pageContent;
    }
  }

  history.push(
    `Content: ${prospectStatement} | Filler Chosen by GPT-4: ${content}`,
  );
}
console.log(history);
