// Change the vectorizer setting below to point to your preferred module
export const openaiClassObject = {
  class: 'ShortFillersOpenAIModel3',
  description: 'Short responses to use in conversation',
  moduleConfig: {
    'text2vec-openai': {
      model: 'ada',
      modelVersion: '002',
      type: 'text',
    },
  },
  properties: [
    {
      dataType: ['text'],
      description: 'The statement being responded to',
      name: 'pageContent',
    },
    {
      dataType: ['text'],
      description: 'The short response ID',
      moduleConfig: {
        'text2vec-openai': {
          skip: false,
          vectorizePropertyName: false,
        },
      },
      name: 'fillerID',
    },
    {
      dataType: ['text'],
      description: 'The short response',
      moduleConfig: {
        'text2vec-openai': {
          skip: false,
          vectorizePropertyName: false,
        },
      },
      name: 'fillerText',
    },
    {
      dataType: ['text'],
      description: 'The category',
      moduleConfig: {
        'text2vec-openai': {
          skip: false,
          vectorizePropertyName: false,
        },
      },
      name: 'category',
    },
  ],
  vectorizer: 'text2vec-openai',
};

export const huggingClassObject = {
  class: 'ShortFillersHuggingFaceModel',
  description: 'Short responses to use in conversation',
  properties: [
    {
      dataType: ['text'],
      description: 'The statement being responded to',
      name: 'pageContent',
    },
    {
      dataType: ['text'],
      description: 'The short response ID',
      name: 'fillerID',
    },
    {
      dataType: ['text'],
      description: 'The short response',
      name: 'fillerText',
    },
    {
      dataType: ['text'],
      description: 'The category',
      name: 'category',
    },
  ],
  vectorizer: 'text2vec-huggingface',
};

export const cohereClassObject = {
  classes: [
    {
      class: 'Document',
      description: 'A class called document',
      vectorizer: 'text2vec-openai',
      moduleConfig: {
        'text2vec-openai': {
          model: 'ada',
          modelVersion: '002',
          type: 'text',
        },
      },
    },
  ],
};
