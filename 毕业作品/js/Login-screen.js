function getValue(id) { 
    return document.getElementById(id).value; 
    // 查找元素
} 
function checkuser() { 
    if(getValue('uname') == "f" && getValue('pwd') == "1314520") { 
        return true; 
    }else { 
        alert("登录名或密码错误！")
        // 警告框
        return false; 
    } 
} 