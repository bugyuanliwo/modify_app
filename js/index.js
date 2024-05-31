function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

let person_value = null;
let person_face = null;
let apply = null;
let events = null;
let onstars = null;

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

function readLst (variable) {
    var fileInput = document.getElementById(variable);
    var file = fileInput.files[0];

    if (file) {
        if (file.name !== variable + '.sa') {
            alert(`你上传的文件名并非${variable}.sa，请确认这是你想上传的文件!`);
        }
        var reader = new FileReader();

        reader.onload = function(e) {
            var contents = e.target.result;
            try {
                switch (variable) {
                    case 'apply':
                        apply = JSON.parse(contents);
                        break;
                    case 'events':
                        events = JSON.parse(contents);
                        break;
                    case 'onstars':
                        onstars = JSON.parse(contents);
                        break;
                }
            } catch (error) {
                alert("解析文件错误: " + error.message);
            }
        };

        reader.readAsText(file);
    } else {
        alert("请选择一个文件");
    }
}


function assignValue (variable) {
    let contents = document.getElementById(variable).value;
    switch (variable) {
        case 'input_persons_value':
            var initialData = JSON.parse(contents);
            person_value = initialData['re'].map(item => JSON.parse(item));
            break;
        case 'input_persons_face':
            var initialData = JSON.parse("["+contents.substring(0, contents.length-1)+"]");
            person_face = initialData.map(item => JSON.parse(item));
            break;
        case 'input_apply':
            apply = JSON.parse(contents);
            break;
        case 'input_events':
            events = JSON.parse(contents);
            break;
        case 'input_onstars':
            onstars = JSON.parse(contents);
            break;
    }
}

function showData(value) {
    switch(value) {
        case 'value':
            document.getElementById('message').textContent = JSON.stringify(person_value);
            break;
        case 'face':
            document.getElementById('message').textContent = JSON.stringify(person_face);
            break;
        case 'apply':
            document.getElementById('message').textContent = JSON.stringify(apply);
            break;
        case 'events':
            document.getElementById('message').textContent = JSON.stringify(events);
            break;
        case 'onstars':
            document.getElementById('message').textContent = JSON.stringify(onstars);
            break;
    }
}

function readOnstar() {
    var fileInput = document.getElementById('getOnstars');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        if (file.name !== 'onstars.sa') {
            alert('你上传的文件名并非onstars.sa，请确认这是你想上传的文件!');
        }

        reader.onload = function(e) {
            var contents = e.target.result;
            try {
                document.getElementById('inputList').value = contents.substring(1,contents.length-1);

            } catch (error) {
                alert("解析文件错误: " + error.message);
            }
        };

        reader.readAsText(file);
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
    document.getElementById('message').textContent = `修改年龄成功`;
}

function changeBrow() {
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n = parseInt(document.getElementById('newBrow').value);
    if (!confirm(`确认将编号为${lst}的角色眉毛修改为${n}吗？`)) {
        return;
    }
    person_face.forEach(p => {
        if (lst.includes(p.re[0])) {
            p.re[4] = n;
        }
    })
    document.getElementById('message').textContent = `修改眉毛成功`;
}

function changeEye() {
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n = parseInt(document.getElementById('newEye').value);
    if (!confirm(`确认将编号为${lst}的角色眼睛修改为${n}吗？`)) {
        return;
    }
    person_face.forEach(p => {
        if (lst.includes(p.re[0])) {
            p.re[5] = n;
        }
    })
    document.getElementById('message').textContent = `修改眼睛成功`;
}

function changeFace() {
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n = parseInt(document.getElementById('newFace').value);
    if (!confirm(`确认将编号为${lst}的角色脸型修改为${n}吗？`)) {
        return;
    }
    person_face.forEach(p => {
        if (lst.includes(p.re[0])) {
            p.re[2] = n;
        }
    })
    document.getElementById('message').textContent = `修改眼睛成功`;
}

function changeMouth() {
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n = parseInt(document.getElementById('newMouth').value);
    if (!confirm(`确认将编号为${lst}的角色嘴唇修改为${n}吗？`)) {
        return;
    }
    person_face.forEach(p => {
        if (lst.includes(p.re[0])) {
            p.re[6] = n;
        }
    })
    document.getElementById('message').textContent = `修改嘴唇成功`;
}

function changeEar() {
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n = parseInt(document.getElementById('newEar').value);
    if (!confirm(`确认将编号为${lst}的角色耳朵修改为${n}吗？`)) {
        return;
    }
    person_face.forEach(p => {
        if (lst.includes(p.re[0])) {
            p.re[3] = n;
        }
    })
    document.getElementById('message').textContent = `修改耳朵成功`;
}

function changeBHair() {
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n = parseInt(document.getElementById('newFHair').value);
    if (!confirm(`确认将编号为${lst}的角色修改后发为${n}吗？`)) {
        return;
    }
    person_face.forEach(p => {
        if (lst.includes(p.re[0])) {
            p.re[3] = n;
        }
    })
    document.getElementById('message').textContent = `修改后发成功`;
}

function changeFHair() {
    if (!person_face) {
        alert(`无法获取persons_face数据`);
    }
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    var n = parseInt(document.getElementById('newFHair').value);
    if (!confirm(`确认将编号为${lst}的角色前发修改为${n}吗？`)) {
        return;
    }
    person_face.forEach(p => {
        if (lst.includes(p.re[0])) {
            p.re[3] = n;
        }
    })
    document.getElementById('message').textContent = `修改前发成功`;
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

function changeLove() {
    if (!person_value) {
        alert(`无法获取persons_value数据`);
    }
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    var p = parseInt(document.getElementById('lovePerson').value);

    person_value.forEach( p => {
        if (n === p.ni[3]) {
            p._l2k.unshift(pid)
            p._l2v.unshift(100)
        }
    })
}

function marryAll() {
    if (apply == null) {
        apply = [[],[],[],[],[]];
    }
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    for (i in lst) {
        apply[3].push([1, parseInt(lst[i])])
    }

    document.getElementById("message").textContent = `已添加入宫请求，当前apply.sa为：\r\n${JSON.stringify(apply)}`;

}

function marryRequest() {
    if (apply == null) {
        apply = [[],[],[],[],[]];
    }
    var love1 = document.getElementById('lovePersonA').value;
    var love2 = document.getElementById('lovePersonB').value;
    apply[3].push([2, parseInt(love1), parseInt(love2)]);

    document.getElementById("message").textContent = `已添加赐婚请求，当前apply.sa为：\r\n${JSON.stringify(apply)}`;

}

function killMultipleEvents() {
    if (events == null) {
        events = [];
    }
    var lst = JSON.parse("[" + document.getElementById('inputList').value + "]");
    
    for (i in lst) {
        events.push([36,29,1,parseInt(i),0])
    }

    document.getElementById("message").textContent = `已添加刺杀事件，当前的events.sa为：\r\n${JSON.stringify(events)}`;
        
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

function findByBirth() {
    if (!person_value) {
        alert(`无法获取persons_value数据`);
    }
    var age = parseInt(document.getElementById('personAge').value);
    var m = parseInt(document.getElementById('birthM').value);
    var d = parseInt(document.getElementById('birthD').value);
    var msg = '';
    var ids = [];
    person_value.forEach(p => {
        if (p.ni[4] == age && p.ni[5] == m && p.ni[6] == d) {
            ids.push(p.ni[3]);
            msg += JSON.stringify(p);
        }
    })

    document.getElementById("message").textContent = `符合条件的人物id：${ids}`;

    const button = document.createElement('button');
  
    button.innerText = '加入onstars'; // Text shown on the button
    button.onclick = function() { alert('Button Clicked!'); }; // Event handler for the button click

    // Get the div element by its ID
    const div = document.getElementById('message');

    // Append the button as a child of the div
    div.appendChild(button);
    document.getElementById("message").appendChild('button')
}

function findByAge() {
    var msg = '';
    var ids = [];
    var ageFrom = parseInt(document.getElementById('ageFrom').value);
    var ageTo = parseInt(document.getElementById('ageTo').value);
    person_value.forEach(p => {
        if (p.ni[4] >= ageFrom && p.ni[4] <= ageTo) {
            ids.push(p.ni[3]);
            msg += JSON.stringify(p);
        }
    })

    document.getElementById("message").textContent = `符合条件的人物id：${ids}，\r\n符合条件的人物信息:\r\n${msg}`;

}

function findByOccu() {
    var occupation = parseInt(document.getElementById('occupation').value);
    var l = [];
    person_value.forEach(p => {
        if (p.ni[17] === occupation) {
            l.push(p.ni[3]);
        }
    })
    document.getElementById("message").textContent = `符合条件的人物id：${l}`;

}

function checkLoyalty() {
    if (!person_value) {
        alert(`无法获取persons_value数据`);
    }
    var p1 = parseInt(document.getElementById('loyp1').value);
    var p2 = parseInt(document.getElementById('loyp2').value);
    var res = ``;

    person_value.forEach(p => {
        if (p1 === p.ni[3]) {
            var l1k = p._l1k;
            var l1v = p._l1v;
            var r1k = p._r1k;
            var r1v = p._r1v;
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

    var numP = parseInt(document.getElementById('numP').value);
    var sex = parseInt(document.getElementById('sex').value);
    var newPValue = document.getElementById('newPValue').value;
    var newPFace = document.getElementById('newPValue').value;

    var lst = [];

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
        var temp_p = JSON.parse(newPValue);
        var temp_f = JSON.parse(newPFace);
        console.log(person_value.length);
        temp_p.ni[3] = new_id;
        person_value.push(temp_p);

        temp_f.re[0] = new_id;
        person_face.push(temp_f);
        lst.push(new_id);
        new_id += 1;
    }

    document.getElementById("message").textContent = `添加了${numP}个人物，id为：${lst}`;
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