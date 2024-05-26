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
    if (!person_value) {
        alert(`无法获取persons_value数据`);
    }
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
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }
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
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }
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
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }
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
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }
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
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }

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
    if (!person_value) {
        alert(`无法获取persons_value数据`);
    }
    var n = parseInt(document.getElementById('checkP').value);

    person_value.forEach(p => {
        if (n === p.ni[3]) {
            document.getElementById("message").textContent = JSON.stringify(p);
        }
    })
    
}

function checkFace() {
    var n = parseInt(document.getElementById('checkFace').value);
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }

    person_face.forEach(p => {
        if (n === p.re[0]) {
            document.getElementById("message").textContent = JSON.stringify(p);
        }
    })
    
}

function checkLoyalty() {
    var p1 = parseInt(document.getElementById('loyp1').value);
    var p2 = parseInt(document.getElementById('loyp2').value);
    var res = ``;

    person_value.forEach(p => {
        if (p1 === p.ni[3]) {
            var l1k = p._l1k;
            var l1v = p._l1v;
            var r1k = p._r1k;
            var r1v = p.r1v;
            for (let i=0; i<l1k.length; i++) {
                if (l1k[i] === p2) {
                    res += `${p1}对${p2}忠诚：${l1v[i]}, `;
                    break
                }
            }
            for (let i=0; i<r1k.length; i++) {
                if (r1k[i] === p2) {
                    res += `${p2}对${p1}忠诚：${r1v[i]}, `;
                    break
                }
            }
        }
    })
    document.getElementById("message").textContent = res;
    if (res === ``) {
        document.getElementById("message").textContent = `没有找到任何东西`;
    }
}

function addP() {
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }
    if (!person_value) {
        alert(`无法获取persons_value数据`);
    }
    var new_id = person_value[person_value.length - 1].ni[3] + 1;
    console.log(new_id);
    var numP = parseInt(document.getElementById('numP').value);
    var sex = parseInt(document.getElementById('sex').value);
    var newPValue = document.getElementById('newPValue').value;
    var newPFace = document.getElementById('newPValue').value;
    console.log(newPValue);

    if (sex === 3) {
        if (newPValue === "") {
            newPValue = "{\"ni\":[-1,367,247,0,27,7,16,3,8800,4500,150,120,6,0,-1,-1,2,0,0,0,7100,0,0,-1,-1,-1,-1,-1,-1,1,-1,0,-1,14,-1,-1,-1,-1,0,0,0,0,-1,0,-1,-1,-1,-1,-1,-1,0,0],\"nb\":[false,false,false,true,false,false],\"didsave\":[],\"_f\":[0],\"_t\":[7],\"_l1k\":[],\"_l1v\":[],\"_l2k\":[],\"_l2v\":[],\"_r1k\":[],\"_r1v\":[],\"_r2k\":[],\"_r2v\":[],\"_w\":[],\"_s\":[],\"c0\":[],\"c1\":[],\"c2\":[],\"c3\":[]}";
        }
        if (newPFace === "") {
            newPFace = "{\"re\":[504,3,8,0,10,4,16,16,12,0,0,64,110,1,55,105,283,34,193,0,0,0,2,213,116,96,2,319,88,112,1,76,47,73,2,182,2,78,0,140,5,157,2,99,73,88]}";
        }
    } else if (sex === 4) {
        if (newPValue === "") {
            newPValue = "{\"ni\":[-1,5,0,1,26,1,1,4,7600,9800,101,130,0,0,-1,-1,2,0,0,10000,10000,2,0,-1,-1,-1,-1,-1,-1,1,-1,0,-1,14,-1,-1,-1,-1,0,0,0,0,-1,0,-1,-1,-1,-1,-1,-1,0,0],\"nb\":[false,true,true,true,false,false],\"didsave\":[],\"_f\":[],\"_t\":[0],\"_l1k\":[],\"_l1v\":[],\"_l2k\":[],\"_l2v\":[],\"_r1k\":[],\"_r1v\":[],\"_r2k\":[],\"_r2v\":[],\"_w\":[],\"_s\":[],\"c0\":[],\"c1\":[],\"c2\":[],\"c3\":[]}";
        }
        if (newPFace === "") {
            newPFace = "{\"re\":[1,4,2,0,7,8,14,0,11,0,0,80,115,188,160,100,0,41,33,100,100,105,0,276,111,113,2,283,97,94,1,265,114,95,0,100,1,30,1,31,3,1,0,59,103,105]}";
        }
    }

    for (let i = 0; i < numP; i ++) {
        newPValue = JSON.parse(newPValue);
        newPValue.ni[3] = new_id;
        person_value.push(newPValue);

        newPFace = JSON.parse(newPFace);
        newPFace.re[0] = new_id;
        person_face.push(newPFace);
        new_id += 1;
    }

    document.getElementById("message").textContent = `添加了${numP}个人物`;
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