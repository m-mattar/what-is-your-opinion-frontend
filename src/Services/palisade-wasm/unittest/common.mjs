export function copyVecToJs(vec) {
	return new Array(vec.size()).
		fill(0).
		map((_,idx) => vec.get(idx));
}
