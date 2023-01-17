const txtLoginId = new verification('#txtLoginId',async function(value){
    if(!value){
        return '请填写账号';
    }
}) 

const txtLoginPwd = new verification('#txtLoginPwd',async function(value){
    if(!value){
        return '请填写密码';
    }
})


const form = $('.user-form');
form.onsubmit = async function(e){
    e.preventDefault();
    const result = await verification.yz(txtLoginId,txtLoginPwd);
    if(!result) return;
    const formdata  = new FormData(form);
    const data = Object.fromEntries(formdata.entries());
    const resp = await API.login(data);
    if(!resp.code){
        alert('登录成功,点击确定跳转主页');
        location.href = './index.html';
    }else{
        txtLoginId.p.innerText = '账号或密码不正确，请重新输入！';
        txtLoginId.input.value = '';
        txtLoginPwd.input.value = '';
    }
}

