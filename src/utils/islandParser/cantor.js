const list1 = ['forbidden', 'terrible','corrupted'];
const list2 = ['isle', 'island','dock'];

const stringCurry = (s1, s2, curry) => curry(list1.indexOf(s1), list2.indexOf(s2));
const cantor = (k1, k2) => (k1 + k2) * (k1 + k2 + 1)/2 + k2;
const szudzik = (a, b) => a >= b ? a * a + a + b : a + b * b;

for(const word1 of list1) {
    for(const word2 of list2) {
        const a = list1.indexOf(word1);
        const b = list2.indexOf(word2);
        console.log(word1, word2, cantor(a, b), szudzik(a, b));
    }
}