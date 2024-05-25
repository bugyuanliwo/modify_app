let person_value = null;
let person_face = null;

function readValue() {
    var fileInput = document.getElementById('person_value');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        if (file.name !== 'persons_value.sa') {
            alert('你上传的文件名并非persons_value.sa，请确认这是你想上传的文件!');
        }

        reader.onload = function(e) {
            var contents = e.target.result;
            try {
                var initialData = JSON.parse(contents);
                person_value = initialData['re'].map(item => JSON.parse(item));
            } catch (error) {
                alert("解析文件错误: " + error.message);
            }
        };

        reader.readAsText(file);
    } else {
        alert("请选择一个文件");
    }
}

function readFace() {
    
    var fileInput = document.getElementById('person_face');
    var file = fileInput.files[0];

    if (file) {
        if (file.name !== 'persons_face.sa') {
            alert('你上传的文件名并非persons_face.sa，请确认这是你想上传的文件!');
        }
        var reader = new FileReader();

        reader.onload = function(e) {
            var contents = e.target.result;
            try {
                var initialData = JSON.parse("["+contents.substring(0, contents.length-1)+"]");
                person_face = initialData.map(item => JSON.parse(item));
            } catch (error) {
                alert("解析文件错误: " + error.message);
            }
        };

        reader.readAsText(file); // 以文本形式读取文件
    } else {
        alert("请选择一个文件");
    }
}

function changeAge() {
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n = parseInt(document.getElementById('newAge').value);
    if (!confirm(`确认将编号为${lst}的角色年龄修改为${n}吗？`)) {
        return;
    }
    person_value.forEach(p => {
        if (lst.includes(p.ni[3])) {
            p.ni[4] = n;
        }
    })
    document.getElementById('message').textContent = `修改年龄成功，请下载persons_value`;
}

function changeCloth() {
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n = parseInt(document.getElementById('newCloth').value);
    if (!confirm(`确认将编号为${lst}的角色服饰修改为${n}吗？`)) {
        return;
    }
    person_face.forEach(p => {
        if (lst.includes(p.re[0])) {
            p.re[26] = n;
        }
    })
}

function changeDec() {
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n = parseInt(document.getElementById('newDec').value);
    if (!confirm(`确认将编号为${lst}的角色服饰修改为${n}吗？`)) {
        return;
    }
    person_face.forEach(p => {
        if (lst.includes(p.re[0])) {
            p.re[40] = n;
        }
    })
}

function changeHair() {
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n1 = parseInt(document.getElementById('hairColor1').value);
    var n2 = parseInt(document.getElementById('hairColor2').value);
    var n3 = parseInt(document.getElementById('hairColor3').value);

    if (!confirm(`确认将编号为${lst}的发色修改为${n1},${n2},${n3}吗？`)) {
        return;
    }
    person_face.forEach(p => {
        if (lst.includes(p.re[0])) {
            p.re[16] = n1;
            p.re[17] = n2;
            p.re[18] = n3;
        }
    })
}

function changeColor() {
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n1 = parseInt(document.getElementById('pColor1').value);
    var n2 = parseInt(document.getElementById('pColor2').value);
    var n3 = parseInt(document.getElementById('pColor3').value);

    if (!confirm(`确认将编号为${lst}的角色配色修改为${n1},${n2},${n3}吗？`)) {
        return;
    }
    person_face.forEach(p => {
        if (lst.includes(p.re[0])) {
            p.re[10] = n1;
            p.re[11] = n2;
            p.re[12] = n3;
        }
    })
}

function changeEyeColor() {
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n1 = parseInt(document.getElementById('eColor1').value);
    var n2 = parseInt(document.getElementById('eColor2').value);
    var n3 = parseInt(document.getElementById('eColor3').value);

    if (!confirm(`确认将编号为${lst}的眼睛颜色修改为${n1},${n2},${n3}吗？`)) {
        return;
    }
    person_face.forEach(p => {
        if (lst.includes(p.re[0])) {
            p.re[13] = n1;
            p.re[14] = n2;
            p.re[15] = n3;
        }
    })
}

function checkP() {
    var n = parseInt(document.getElementById('checkP').value);

    person_value.forEach(p => {
        if (n === p.ni[3]) {
            document.getElementById("message").textContent = JSON.stringify(p);
        }
    })
}

function checkFace() {
    var n = parseInt(document.getElementById('checkFace').value);

    person_value.forEach(p => {
        if (n === p.ni[3]) {
            document.getElementById("message").textContent = JSON.stringify(p);
        }
    })
}

function downloadValueFile() {
    if (person_value) {
        let list = [];
        person_value.forEach(item => {
            list.push(JSON.stringify(item));
        })

        var blob = new Blob([JSON.stringify({"re": list})], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "persons_value_edit.sa";
        a.click();
        URL.revokeObjectURL(url);
    } else {
        alert("没有数据可下载");
    }
}

function downloadFaceFile() {
    if (person_face) {
        let list = [];
        person_face.forEach(item => {
            list.push(JSON.stringify(item));
        })

        let jsonString = JSON.stringify(list);
        jsonString = jsonString.substring(1, jsonString.length - 1) + ",";

        var blob = new Blob([jsonString], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "persons_face_edit.sa";
        a.click();
        URL.revokeObjectURL(url);
    } else {
        alert("没有数据可下载");
    }
}