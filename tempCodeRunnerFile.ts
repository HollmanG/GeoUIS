const n = 5;

const imprimirX = (n:number) => {
	const n1:number = n;
	let respuesta:string = '';
	if(n = 0){
		respuesta =  "ERROR";
	}
	const x = 'X';
	const sub = '_';
	for(let i = 0; i<n; i++){
		for(let j = 0; j<n;j++){
			respuesta += j == i || j == n1 ? x : sub; 
		}
	}
	return respuesta;
}

console.log(imprimirX(n));
