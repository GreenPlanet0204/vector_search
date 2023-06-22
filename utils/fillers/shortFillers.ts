import { Document } from 'langchain/document';

export const excitingFillers = [
  new Document({
    metadata: { category: 'A', fillerID: 1 },
    pageContent: 'Gotcha',
  }),
  new Document({
    metadata: { category: 'A', fillerID: 2 },
    pageContent: 'Yah gotcha',
  }),
  new Document({
    metadata: { category: 'A', fillerID: 3 },
    pageContent: 'Ok gotcha',
  }),
  new Document({
    metadata: { category: 'A', fillerID: 4 },
    pageContent: 'wow',
  }),
  new Document({
    metadata: { category: 'A', fillerID: 5 },
    pageContent: 'Ok yah',
  }),
  new Document({
    metadata: { category: 'A', fillerID: 6 },
    pageContent: 'Totally',
  }),
  new Document({
    metadata: { category: 'A', fillerID: 7 },
    pageContent: 'Yah totally',
  }),
  new Document({
    metadata: { category: 'A', fillerID: 8 },
    pageContent: 'Yeah',
  }),
  new Document({
    metadata: { category: 'A', fillerID: 9 },
    pageContent: 'Interesting',
  }),
  new Document({
    metadata: { category: 'A', fillerID: 10 },
    pageContent: 'Definitely',
  }),
  new Document({
    metadata: { category: 'A', fillerID: 11 },
    pageContent: 'For sure',
  }),
  new Document({
    metadata: { category: 'A', fillerID: 13 },
    pageContent: 'Uh-huh',
  }),
  new Document({
    metadata: { category: 'A', fillerID: 14 },
    pageContent: 'Mhmm',
  }),
];

export const sadFillers = [
  new Document({
    metadata: { category: 'B', fillerID: 15 },
    pageContent: 'Gotcha',
  }),
  new Document({
    metadata: { category: 'B', fillerID: 16 },
    pageContent: 'Ok gotcha',
  }),
  new Document({
    metadata: { category: 'B', fillerID: 17 },
    pageContent: 'wow',
  }),
];

export const affirmationFillers = [
  new Document({
    metadata: { category: 'C', fillerID: 18 },
    pageContent: 'Ok yah',
  }),
  new Document({
    metadata: { category: 'C', fillerID: 19 },
    pageContent: 'Yah umm',
  }),
  new Document({
    metadata: { category: 'C', fillerID: 20 },
    pageContent: 'Ummm yah',
  }),
  new Document({
    metadata: { category: 'C', fillerID: 21 },
    pageContent: 'Yeah',
  }),
  new Document({
    metadata: { category: 'C', fillerID: 22 },
    pageContent: 'Okay',
  }),
];

export const questionFillers = [
  new Document({
    metadata: { category: 'D', fillerID: 24 },
    pageContent: 'Yah umm',
  }),
  new Document({
    metadata: { category: 'D', fillerID: 25 },
    pageContent: 'Ummm',
  }),
  new Document({
    metadata: { category: 'D', fillerID: 26 },
    pageContent: 'Ummm yah',
  }),
  new Document({
    metadata: { category: 'D', fillerID: 27 },
    pageContent: 'Yeah',
  }),
  new Document({
    metadata: { category: 'D', fillerID: 28 },
    pageContent: 'Uh-huh',
  }),
  new Document({
    metadata: { category: 'D', fillerID: 29 },
    pageContent: 'Mhmm',
  }),
];

const repeatFillers = [
  new Document({
    metadata: { category: 'E', fillerID: 30 },
    pageContent: 'Yah umm',
  }),
  new Document({
    metadata: { category: 'E', fillerID: 31 },
    pageContent: 'Ummm',
  }),
  new Document({
    metadata: { category: 'E', fillerID: 32 },
    pageContent: 'Ummm yah',
  }),
  new Document({
    metadata: { category: 'E', fillerID: 33 },
    pageContent: 'Yeah',
  }),
  new Document({
    metadata: { category: 'E', fillerID: 34 },
    pageContent: 'Uh-huh',
  }),
  new Document({
    metadata: { category: 'E', fillerID: 35 },
    pageContent: 'Mhmm',
  }),
];

export const apologizeFillers = [
  new Document({
    metadata: { category: 'F', fillerID: 36 },
    pageContent: 'Yah umm',
  }),
  new Document({
    metadata: { category: 'F', fillerID: 37 },
    pageContent: 'Ummm',
  }),
  new Document({
    metadata: { category: 'F', fillerID: 38 },
    pageContent: 'Ummm yah',
  }),
  new Document({
    metadata: { category: 'F', fillerID: 39 },
    pageContent: 'Yeah',
  }),
];

export const neutralFillers = [
  new Document({
    metadata: { category: 'G', fillerID: 40 },
    pageContent: 'Gotcha',
  }),
  new Document({
    metadata: { category: 'G', fillerID: 41 },
    pageContent: 'Yah gotcha',
  }),
  new Document({
    metadata: { category: 'G', fillerID: 42 },
    pageContent: 'Ok gotcha',
  }),
  new Document({
    metadata: { category: 'G', fillerID: 43 },
    pageContent: 'Ok yah',
  }),
  new Document({
    metadata: { category: 'G', fillerID: 44 },
    pageContent: 'Yah totally',
  }),
  new Document({
    metadata: { category: 'G', fillerID: 45 },
    pageContent: 'Yeah',
  }),
  new Document({
    metadata: { category: 'G', fillerID: 46 },
    pageContent: 'Uh-huh',
  }),
  new Document({
    metadata: { category: 'G', fillerID: 47 },
    pageContent: 'Mhmm',
  }),
];

export const allShortFillers = [
  ...excitingFillers,
  ...sadFillers,
  ...affirmationFillers,
  ...questionFillers,
  ...repeatFillers,
  ...apologizeFillers,
  ...neutralFillers,
];
