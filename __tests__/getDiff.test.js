import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import getDiff from '../src/getDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const expectedStylishResultFilepath = getFixturePath('stylishResult.txt');
const expectedPlainResultFilepath = getFixturePath('plainResult.txt');
const expectedJSONResultFilepath = getFixturePath('jsonResult.txt');

test('check jsons files with stylish format', () => {
  const expectedResultContent = readFile(expectedStylishResultFilepath);
  const result = getDiff(filepath1, filepath2, 'stylish');
  expect(result).toBe(expectedResultContent);
});

test('check jsons files with plain format', () => {
  const expectedResultContent = readFile(expectedPlainResultFilepath);
  const result = getDiff(filepath1, filepath2, 'plain');
  expect(result).toBe(expectedResultContent);
});

test('check jsons files with json format', () => {
  const expectedResultContent = readFile(expectedJSONResultFilepath);
  const result = getDiff(filepath1, filepath2, 'json');
  expect(result).toBe(expectedResultContent);
});

test('check yaml files with stylish format', () => {
  const expectedResultContent = readFile(expectedStylishResultFilepath);
  const result = getDiff(filepath1, filepath2, 'stylish');
  expect(result).toBe(expectedResultContent);
});

test('check yaml files with plain format', () => {
  const expectedResultContent = readFile(expectedPlainResultFilepath);
  const result = getDiff(filepath1, filepath2, 'plain');
  expect(result).toBe(expectedResultContent);
});

test('check yaml files with json format', () => {
  const expectedResultContent = readFile(expectedJSONResultFilepath);
  const result = getDiff(filepath1, filepath2, 'json');
  expect(result).toBe(expectedResultContent);
});
