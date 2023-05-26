const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let index = 0; index < array.length; index++) {
	console.log(`array: ${array} index: ${index} arrayIndex: ${array[index]}`);
	array.splice(4, 3, 'removido');
	console.log(`array: ${array} index: ${index} arrayIndex: ${array[index]}`);
}
