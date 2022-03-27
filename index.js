const prompt = require('prompt-sync')({ sigint: true });

let tableau = '8, 6, 7, 3, 2, 1, 9';
const k = 2;
calcul_max_produit(
  tableau.split(',').map((x) => parseInt(x)),
  k
);

/**
 *
 * @param {int[]} tab
 * @param {int} k
 */
function calcul_max_produit(tab, k) {
  let final_array = [];

  // tri du tableau
  tab.sort();

  // récupération de k nombre positif
  const positive_numbers = get_rights_positive_numbers(tab, k);
  console.log('positif', positive_numbers);
  // récupération d'un nombre paire d'éléments <= k
  const negative_numbers = get_rights_negative_numbers(tab, k);
  console.log('negatif', negative_numbers);
  // retrouvons l'ensemble des nombres négatifs qui sont supérieurs
  // à des nombres positifs en valeur absolue
  const inter_result = negative_numbers.reduce((acc, value) => {
    if (positive_numbers.some((x) => x < Math.abs(value)))
      acc.push(Math.abs(value));
    return acc;
  }, []);
  console.log('Inter ', inter_result);
  // Cas 1 : le nombre d'éléments positifs est supérieur ou égal à k
  // (on aurait pu se limiter à = k, voir func get_rights_positive_numbers)
  if (positive_numbers.length >= k) {
    if (inter_result.length % 2 == 0) {
      final_array = [
        ...inter_result,
        ...positive_numbers.slice(0, k - inter_result.length),
      ];
    } else {
      final_array = [...positive_numbers];
    }
  } else {
    // Cas 2 : Le nombre d'éléments positifs est inférieur ou égal à k

    // Cas 2 - 1 : est paire
    if (k % 2 == 0) {
      final_array = [...negative_numbers.slice(0, k)];
    } else {
      // Cas 2 - 1 : k est impaire
      final_array = [
        ...negative_numbers.slice(0, k - (k % 2)),
        positive_numbers[0],
      ];
    }
  }

  console.log('final array ', final_array);
  const produit_max = final_array.reduce((acc, value) => {
    acc *= value;
    return acc;
  }, 1);

  console.log('Le produit max est le suivant : ', produit_max);
}

/**
 * Cette fonction retourne les chiffres négatifs du tableau.
 * Le nombre d'éléments retournés est strictement pair et est inférieur ou égal à k
 * Les éléments retournés sont rangés par ordre croissant
 * @param {int[]} tab
 * @param {int} k
 * @returns {int[]} Array of négative number
 */
function get_rights_negative_numbers(tab, k) {
  let counter = 0; // element counter
  let result = tab.reduce((acc, value) => {
    if (value < 0) {
      acc.push(value);
      counter++;
    }
    return acc;
  }, []);

  result.sort((a, b) => a - b);
  console.log('R', result);
  const slice_end = counter >= k ? k - (k % 2) : counter - (counter % 2);
  console.log('test ', result.slice(0, slice_end));
  return result.slice(0, slice_end);
}
/**
 * Cette fonction retourne les éléments positifs du tableau
 * Les éléments retournés sont rangés par ordre décroissant
 * @param {int[]} tab
 * @param {int} k
 * @returns {int[]} Array of positive number
 */
function get_rights_positive_numbers(tab, k) {
  let counter = 0; // element counter
  let result = tab.reduce((acc, value) => {
    if (value >= 0) {
      acc.push(value, 10);
      counter++;
    }
    return acc;
  }, []);

  result = result.sort().reverse();

  return result.slice(0, Math.min(k, counter));
}
// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;
