import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import getJsonsDiff from '../src/getJsonsDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('check jsons files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expectedFilepath = getFixturePath('result1.txt');
  const expectedResultContent = readFile(expectedFilepath);
  const result = getJsonsDiff(filepath1, filepath2);
  expect(result).toBe(expectedResultContent);
});

test('check yaml files', () => {
  const filepath1 = getFixturePath('file3.yml');
  const filepath2 = getFixturePath('file4.yml');
  const expectedFilepath = getFixturePath('result1.txt');
  const expectedResultContent = readFile(expectedFilepath);
  const result = getJsonsDiff(filepath1, filepath2);
  expect(result).toBe(expectedResultContent);
});
