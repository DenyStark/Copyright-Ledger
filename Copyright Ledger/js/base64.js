/*
* Превращает любой документ в формат base64
*/
function handleFiles() {
    var reader = new FileReader(),
    input = document.getElementById('input').files[0],
    output = document.getElementById('output');

    reader.addEventListener("loadend", function(result) {
        var str = result.target.result;
        //output.innerHTML = str;
        get_hash_sha512(str);
        // тут будем записывать объект obj в бд
    }, false);

    reader.readAsDataURL(input);
}

/*
* Выводит время в UNIX формате
*/
function time() {
    return parseInt(new Date().getTime()/1000);
}

/*
* Возвращает строку + время в UNIX формате 
* преобразованную в 64 символа с помощью алгоритма sha512 
*
* @param {string} str
*/        
function get_hash_sha512(str) {
    var tm = time();//parseInt(new Date().getTime()/1000);
    var obj = {
        hash: sha512(sha512(str + tm)),
        unix_time: tm
    };
    download_file('copyright-ledger', tm, "  ", obj.hash);// в этом файле будет еще больше информации о сайте и о способе доказательства авторских прав
    return obj;
}

/*
* Скачивает на компьютер пользователя файл
*
* @param {string} filename
* @param {string} text
*/
function download_file(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

console.log(get_hash_sha512('information'));