const app = new function() {
	this.doCrypt = function(isDecrypt) {
		const clave = document.getElementById("clave").value;
		if (clave.length == 0) {
			alert("No hay clave");
			return;
		}
		let claveA = filterKey(clave);
		if (claveA.length == 0) {
			alert("no tiene letras la clave");
			return;
		}
		
		if (isDecrypt) {
			for (let i = 0; i < claveA.length; i++)
            claveA[i] = (26 - claveA[i]) % 26;
		}
		
		let texto = document.getElementById("texto V");
		texto.value = crypt(texto.value, claveA);
	};
	function crypt(input, clave) {
		let output = "";
		let j = 0;
		for (const ch of input) {
			const cc = ch.codePointAt(0);
			if (isUppercase(cc)) {
				output += String.fromCodePoint((cc - 65 + clave[j % clave.length]) % 26 + 65);
				j++;
			} else if (isLowercase(cc)) {
				output += String.fromCodePoint((cc - 97 + clave[j % clave.length]) % 26 + 97);
				j++;
			} else {
				output += ch;
			}
		}
		return output;
	}
	function filterKey(clave) {
		let result = [];
		for (const ch of clave) {
			const cc = ch.codePointAt(0);
			if (isLetter(cc))
				result.push((cc - 65) % 32);
		}
		return result;
	}
	function isLetter(c) {
		return isUppercase(c) || isLowercase(c);
	}
	
	function isUppercase(c) {
		return 65 <= c && c <= 90;
	}
	
	function isLowercase(c) {
		return 97 <= c && c <= 122;
	}
};