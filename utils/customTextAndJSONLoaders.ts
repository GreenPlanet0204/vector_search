import fs from 'fs';
import path from 'path';

export function readFileContent(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export async function getFilesInDirectory(
  directoryPath: string,
  fileType: string,
): Promise<string[]> {
  const files = await fs.promises.readdir(directoryPath);
  const filteredFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === `.${fileType}`,
  );
  return filteredFiles;
}

export async function loadTextDirectory(
  directoryPath: string,
): Promise<string[]> {
  const files = await getFilesInDirectory(directoryPath, 'text');
  const listOfLists = [];
  for (const file of files) {
    // load the text files
    const filePath = path.join(directoryPath, file);
    const content = await readFileContent(filePath);
    listOfLists.push(content);
  }
  return listOfLists;
}

export async function loadJSONDirectory(
  directoryPath: string,
): Promise<string[]> {
  const files = await getFilesInDirectory(directoryPath, 'json');
  const listOfLists = [];
  for (const file of files) {
    // load the text files
    const filePath = path.join(directoryPath, file);
    const content = await readFileContent(filePath);
    listOfLists.push(content);
  }
  return listOfLists;
}
