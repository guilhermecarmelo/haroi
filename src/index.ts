const pau1 = []
const pau2 = []
const pau3 = []

var discos = 4
var movimentnumber=0

for (let I = 1 ; I <= discos; I++){
    pau1.unshift(I)
}

function pad(S, size) {
	let s = S+"";
	while (s.length < size) s = s + " ";
	return s;
}

function even(N){
	if (N % 2 === 0) {
	   return true
	} else {
	   return false
	}
}

function odd(N) {
	return !even(N)
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

function checkmove(t1,t2):boolean{

	if (!t2) {return true}

	if (t1 > t2) {return false}
	if (t1+2 == t2) {return false}
	if (odd(t1) == odd(t2) && even(discos)) {return false}

	return true
}

function analisa(lastone?) {

	let topo1 = pau1.at(-1)
	let topo2 = pau2.at(-1)
	let topo3 = pau3.at(-1)

	let possiblemoves = [topo1,topo2,topo3].sort().reverse().filter(Number)

	let tm = 0
	for (let I = 0; I < possiblemoves.length; I++) {
		const topo = possiblemoves[I];

		if (possiblemoves.length == 3 && I==0){
			continue
		}

		if (topo != lastone){
			tm = topo
			break
		}
	}

	switch (tm) {
		case topo1:{
			if (odd(discos) && checkmove(topo1,topo3)) {movimenta(pau1, pau3)}
			else if (odd(discos) && checkmove(topo1,topo2)) {movimenta(pau1, pau2)}
			else if (even(discos) && checkmove(topo1,topo2)) {movimenta(pau1, pau2)}
			else if (even(discos) && checkmove(topo1,topo3)) {movimenta(pau1, pau3)}
			break
		}
		case topo2:{
			if (odd(discos) && checkmove(topo2,topo1)) {movimenta(pau2, pau1)}
			else if (odd(discos) && checkmove(topo2,topo3)) {movimenta(pau2, pau3)}
            else if (even(discos) && checkmove(topo2,topo3)) {movimenta(pau2, pau3)}
			else if (even(discos) && checkmove(topo2,topo1)) {movimenta(pau2, pau1)}
			break
		}
		case topo3:{
			if (checkmove(topo3,topo2)) {movimenta(pau3, pau2)}
			else if (checkmove(topo3,topo1)) {movimenta(pau3, pau1)}
			break
		}
	}
}


async function movimenta(t1, t2) {
	movimentnumber++

	let themoves = ""

	if (t1 == pau1) { themoves = "1 > "}
	else if (t1 == pau2) { themoves = "2 > "}
	else if (t1 == pau3) { themoves = "3 > "}

	if (t2 == pau1) { themoves = themoves + "1"}
	else if (t2 == pau2) { themoves = themoves + "2"}
	else if (t2 == pau3) { themoves = themoves + "3"}

	let move = t1.at(-1)
	t2.push(move)
	t1.pop()

	console.log(pad(movimentnumber, 3) + " Move: " + pad(themoves, 5) + ' |P1 ' + pad(pau1, 12) + ' |P2 ' + pad(pau2, 12) + ' |P3 ' + pad(pau3, 12))

	if (pau3.length == discos) {
		console.log('cabo')
		return
	}

	analisa(move)
}

analisa()











