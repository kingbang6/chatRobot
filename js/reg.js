const txtLoginId = new verification('#txtLoginId',async function(value){
    if(!value){
        return '请填写账号';
    }
    const result = await API.yanzheng(value);
    if(result.data){
        return '该账号已存在';
    }else{
        return '';
    }
})
const txtNickname = new verification('#txtNickname',async function(value){
    if(!value){
        return '请填写昵称';
    }
})

const txtLoginPwd = new verification('#txtLoginPwd',async function(value){
    if(!value){
        return '请填写密码';
    }
})
const txtLoginPwdConfirm = new verification('#txtLoginPwdConfirm',async function(value){
    if(!value){
        return '请再次填写密码';
    }
    if(value !== txtLoginPwd.input.value){
        return '两次密码不一致';
    }
})

const form = $('.user-form');
form.onsubmit = async function(e){
    e.preventDefault();
    const result = await verification.yz(txtLoginId,txtNickname,txtLoginPwd,txtLoginPwdConfirm);
    if(!result) return;
    const formdata  = new FormData(form);
    const data = Object.fromEntries(formdata.entries());
    const resp = await API.reg(data);
    if(!resp.code){
        alert('注册成功,点击确定跳转登录页');
        location.href = './login.html';
    }
}

