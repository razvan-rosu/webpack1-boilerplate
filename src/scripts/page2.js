import sortBy from 'lodash/sortBy';
import findIndex from 'lodash/findIndex';

const users = [
    { 'user': 'fred',   'age': 48 },
    { 'user': 'barney', 'age': 36 },
    { 'user': 'fred',   'age': 40 },
    { 'user': 'barney', 'age': 34 }
];

const index = findIndex(users, { 'user': 'fred',   'age': 40 });
const sortedArr = sortBy(users, ['user', 'age']);

console.log('Hello page1.js');
console.log('^^^', index);
console.log('>>>', sortedArr);
