import { allShortFillers } from '@/utils/fillers/shortFillers';

export interface fillerObject {
  pageContent: string; // Change this to the actual type of 'obj.pageContent'
  metadata: {
    fillerID: number; // Change this to the actual type of 'fillerID'
    category: string; // Change this to the actual type of 'obj.category'
  };
}

export const turnIdIntoText = (obj: fillerObject) => {
  let text = '';
  for (let i of allShortFillers) {
    if (i.metadata.fillerID === obj.metadata.fillerID) {
      text = i.pageContent;
    }
  }
  return text;
};
