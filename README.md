# hunsorter

Sorting text with the [Hungarian spelling rules](https://helyesiras.mta.hu/helyesiras/default/akh12#F2_4).

## Installation

`npm install hunsorter`

## How to use

### Simple sorting (ascending)

```javascript
import sorting from hunsorter;

const fruits = ['narancs', 'alma', 'körte'];

fruits.sort(sorting);
```

### Simple sorting (descending)

```javascript
import sorting from hunsorter;

const fruits = ['narancs', 'alma', 'körte'];

fruits.sort((a, b) => sorting(b, a));

```

### Sorting with key

```javascript
import sorting from hunsorter;

const fruits = [
  { name: 'narancs' },
  { name: 'alma' },
  { name: 'körte' }
];

fruits.sort((a, b) => sorting(a.name, b.name));
```

### Sorting with multiple keys

```javascript
import sorting from hunsorter;

const fruits = [
  { name: 'narancs', color: 'sárga' },
  { name: 'alma', color: 'piros' },
  { name: 'körte', color: 'sárga' },
];

fruits.sort((a, b) => sorting(a.color, b.color) || sorting(a.name, b.name));
```
