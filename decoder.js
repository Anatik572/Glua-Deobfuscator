const fs = require('fs')
function chr(n) {
    return String.fromCharCode(n);
}
var final_result = "";

var filename = process.argv[2]+".lua";

const data = fs.readFileSync(filename, 'UTF-8');


function DecimalAsciiDecode(ascii){
	var asciidec = "";
	var ascii_splitted = ascii.split('\\');
	ascii_splitted.forEach(function(item){
		console.log(">"+item);
		if(item == "") return;
	    asciidec = asciidec + Number(String.fromCharCode(item));
	});
	return asciidec;
}

// Smart Xor
if(data.indexOf("▲.char(۝(☎[i],") != -1){
	var code_lua_exploded = data.split('▲.char(۝(☎[i],');
	var code_lua_exploded_close = code_lua_exploded[1].split('))');

	var code_lua_exploded_xor = data.split('{');
	var code_lua_exploded_xor2 = code_lua_exploded_xor[1].split('}');
	var xor_char = code_lua_exploded_xor2[0].split(',');
	xor_char.forEach(function(item){
	    final_result = final_result + chr(item ^ code_lua_exploded_close[0]);
	});
}

if(data.indexOf("string.char(bit.bxor(enccodetbl[i],") != -1){
	var code_lua_exploded = data.split('string.char(bit.bxor(enccodetbl[i],');
	var code_lua_exploded_close = code_lua_exploded[1].split('))');

	var code_lua_exploded_xor = data.split('{');
	var code_lua_exploded_xor2 = code_lua_exploded_xor[1].split('}');
	var xor_char = code_lua_exploded_xor2[0].split(',');
	xor_char.forEach(function(item){
	    final_result = final_result + chr(item ^ code_lua_exploded_close[0]);
	});
}

if(data.indexOf('_G["\\69\\78\\68"]') != -1){
	var code_lua_exploded = data.split('_G["\\95"]="');
	var code_lua_exploded_close = code_lua_exploded[1].split('"');
	var decoded_key = DecimalAsciiDecode(code_lua_exploded_close[0]);

	var code_lua_exploded_xor = data.split('{');
	var code_lua_exploded_xor2 = code_lua_exploded_xor[1].split('}');
	var xor_char = code_lua_exploded_xor2[0].split(',');
	xor_char.forEach(function(item){
	    final_result = final_result + chr(item ^ decoded_key);
	});
}

if(data.indexOf('CompileStringEx(compiled_png)') != -1){
	var code_lua_exploded = data.split('compiled_png');
	var code_lua_exploded_close = code_lua_exploded[1].split('=');

	var code_lua_exploded_xor = code_lua_exploded_close[1].split('{');
	var code_lua_exploded_xor2 = code_lua_exploded_xor[1].split('}');
	console.log(code_lua_exploded_xor2[0]);
	var xor_char = code_lua_exploded_xor2[0].split(',');

	xor_char.forEach(function(item){
	    final_result = final_result + chr(item ^ 97);
	});
}

if(data.indexOf('FlagsImageBase64') != -1){
	var code_lua_exploded = data.split('data:image/png/n/');
	var code_lua_exploded_close = code_lua_exploded[1].split(']]');

	final_result = Buffer.from(code_lua_exploded_close[0], 'base64').toString();
}


console.log(final_result);

fs.writeFile(filename, final_result, function (err) {
   if (err) throw err;
   console.log('Fichier créé !');
});




//console.log(DecimalAsciiDecode('\\51\\49\\56\\52'));

