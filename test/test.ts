import test from 'ava';
import sorting from '../src/main';

test('A különböző betűvel kezdődő szavakat az első betűk ábécébeli helye szerint állítjuk rendbe, illetőleg keressük meg.', (t) => {
  const array = [
    'acél',
    'cukor',
    'csók',
    'gép',
    'hideg',
    'kettő',
    'Nagy',
    'nyúl',
    'olasz',
    'öröm',
    'remény',
    'sokáig',
    'szabad',
    'Tamás',
    'vásárol'
  ];

  const shuffled = shuffle(array);
  const sorted = shuffled.sort(sorting);

  t.deepEqual(sorted, array);
});

test('A betűrendbe sorolás szempontjából nem teszünk különbséget a kis- és a nagybetűk között. Ha azonban két besorolandó egység között csupán ebben a vonatkozásban van különbség, akkor a kis kezdőbetűs szó megelőzi a nagy kezdőbetűst.', (t) => {
  const array = [
    'dzsihád',
    'Dzsihád',
    'jácint',
    'Jácint',
    'opera',
    'Opera',
    'szűcs',
    'Szűcs',
    'viola',
    'Viola'
  ];

  const shuffled = shuffle(array);
  const sorted = shuffled.sort(sorting);

  t.deepEqual(sorted, array);
});

test('Az egyjegyű betűt teljesen elkülönítjük az azonos írásjeggyel kezdődő, de külön mássalhangzót jelölő kétjegyű (illetve háromjegyű) betűtől. Mindig az egyjegyű betű van előbb.', (t) => {
  const array = [
    'cudar',
    'cukor',
    'cuppant',
    'csalit',
    'csata',
    'Csepel',
    'Zoltán',
    'zongora',
    'zúdul',
    'zsalu',
    'zseni',
    'Zsigmond'
  ];

  const shuffled = shuffle(array);
  const sorted = shuffled.sort(sorting);

  t.deepEqual(sorted, array);
});

test('Ha a szavak azonos betűvel vagy betűkkel kezdődnek, a sorrendet az első nem azonos betű ábécébeli helye határozza meg.', (t) => {
  const array = [
    'lom',
    'lomb',
    'lombik',
    'Lontay',
    'lovagol',
    'pirinkó',
    'pirinyó',
    'pirít',
    'pirkad',
    'Piroska',
    'tükör',
    'Tünde',
    'tünemény',
    'tüntet',
    'tüzér'
  ];

  const shuffled = shuffle(array);
  const sorted = shuffled.sort(sorting);

  t.deepEqual(sorted, array);
});

test(`Az egyjegyű betűt (miként a szó elején is) teljesen elkülönítjük az azonos elemmel kezdődő, de külön mássalhangzót jelölő kétjegyű (illetve háromjegyű) betűtől, tehát az egyjegyű betű itt is mindig megelőzi a megfelelő többjegyűt.
  Az egyjegyű betűk sorrendjében a kettőzött betűk első és második írásjegye külön-külön betűnek számít. (Vagyis: bb = b + b, rr = r + r stb.)
  A többjegyű betűk kettőzött változatait tartalmazó szavakat sohasem az egyszerűsített alakok szerint soroljuk be a betűrendbe, hanem a megkettőzött betűt mindig két külön betűre bontjuk. (Vagyis: ccs = cs + cs, ggy = gy + gy, ddzs = dzs + dzs stb.).`, (t) => {
  const array = [
    'kas',
    'Kasmír',
    'Kassák',
    'kastély',
    'kasza',
    'kaszinó',
    'kassza',
    'kaszt',
    'mennek',
    'mennének',
    'menü',
    'menza',
    'meny',
    'Menyhért',
    'mennybolt',
    'mennyi',
    'nagy',
    'naggyá',
    'nagygyakorlat',
    'naggyal',
    'nagyít',
    'nagyobb',
    'nagyol',
    'nagyoll'
  ];

  const shuffled = shuffle(array);
  const sorted = shuffled.sort(sorting);

  t.deepEqual(sorted, array);
});

test('A magánhangzók rövid-hosszú párjait jelölő betűk (a – á, e – é, i – í, o – ó, ö – ő, u – ú, ü – ű) betűrendbe soroláskor a kialakult szokás szerint mind a szavak elején, mind pedig a szavak belsejében azonos értékűnek számítanak. A hosszú magánhangzót tartalmazó szó tehát meg is előzheti a megfelelő rövid magánhangzót tartalmazót.', (t) => {
  const array = [
    'ír',
    'Irak',
    'iram',
    'Irán',
    'írandó',
    'iránt',
    'író',
    'iroda',
    'irónia'
  ];

  const shuffled = shuffle(array);
  const sorted = shuffled.sort(sorting);

  t.deepEqual(sorted, array);
});

test('A rövid magánhangzós szó kerül viszont előbbre olyankor, ha a két szó betűsora csak a megfelelő magánhangzók hosszúságában különbözik.', (t) => {
  const array = [
    'Eger',
    'egér',
    'egyfelé',
    'egyféle',
    'elöl',
    'elől',
    'kerek',
    'kerék',
    'keres',
    'kérés',
    'koros',
    'kóros',
    'szel',
    'szél',
    'szeles',
    'széles',
    'szüret',
    'szűret'
  ];

  const shuffled = shuffle(array);
  const sorted = shuffled.sort(sorting);

  t.deepEqual(sorted, array);
});

test('A különírt elemekből álló szókapcsolatokat és az egybeírt vagy kötőjellel kapcsolt összetételeket minden tekintetben olyan szabályok szerint soroljuk betűrendbe, mint az egyszerű szavakat. A szóhatárokat tehát nem vesszük figyelembe. Ugyanez a szabály érvényes a közszavak közé besorolt tulajdonnevekre is.', (t) => {
  const array = [
    'kis részben',
    'kissé',
    'Kiss Ernő',
    'kis sorozat',
    'kissorozat-gyártás',
    'kis számban',
    'kistányér',
    'kis virág',
    'márvány',
    'márványkő',
    'márvány sírkő',
    'Márvány-tenger',
    'márványtömb',
    'Márvány Zsolt',
    'másféle',
    'másol',
    'tiszafa',
    'Tiszahát',
    'Tisza Kálmán',
    'Tisza menti',
    'Tiszántúl',
    'Tisza-part',
    'tiszavirág',
    'tiszt'
  ];

  const shuffled = shuffle(array);
  const sorted = shuffled.sort(sorting);

  t.deepEqual(sorted, array);
});

test(`A betűrendbe soroláskor a szokásostól némiképp eltérően kezeljük a régies írású magyar családnevekben, valamint az idegen szavakban és tulajdonnevekben előforduló régi magyar, illetőleg idegen betűket.
A régies írású magyar családnevekben levő kétjegyű betűket elemeikre bontva soroljuk be (ew = e + w, ch = c + h, cz = c + z stb.). Az idegen ábécékben használt kapcsolatokat szintén külön betűk egymásutánjának tekintjük (ch = c + h, oe = o + e, sch = s + c + h stb.). Az idegen betűk közül azok, amelyek valamelyik magyar betűtől csak mellékjelükben különböznek, a betűrendbe soroláskor nem tekintendők önálló betűknek. Az idegen mellékjelet csak akkor vesszük figyelembe, ha az idegen mellékjeles betűt tartalmazó szó betűinek sorában nincs más különbség. Ilyenkor az idegen mellékjeles szó kerül hátrább.`, (t) => {
  const array = [
    'cérna',
    'Černý',
    'Cholnoky',
    'címez',
    'cukor',
    'Czuczor',
    'csapat',
    'Gaal',
    'galamb',
    'Gärtner',
    'gáz',
    'geodézia',
    'Georges',
    'góc',
    'Goethe',
    'moshat',
    'mosna',
    'Mošna',
    'mosópor',
    'Møsstrand',
    'mostan',
    'munka',
    'Muñoz'
  ];

  const shuffled = shuffle(array);
  const sorted = shuffled.sort(sorting);

  t.deepEqual(sorted, array);
});

const shuffle = (array) => {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};
