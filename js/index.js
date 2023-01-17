(async function(){
    const resp = await API.nowUer();
    const user = resp.data;
    if(!user){
        alert('未登录或登录状态已过期，请重新登陆！');
        location.href = './login.html';
    }

    //以下为登录状态

    const doms = {
        aside:{
            nickname:$('#nickname'),
            loginId:$('#loginId'),
        },
        close:$('.close'),
        chatContainer:$('.chat-container'),
        txtMsg:$('#txtMsg'),
        form:$('.msg-container')
    }

    //初始化
    doms.aside.nickname.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId;
    async function getHistorychat(){
        const resp = await API.getHistory();
        resp.data.forEach(item =>addChat(item));
        scroll();
        doms.chatContainer.style.scrollBehavior = 'smooth';
    }
    await getHistorychat();


    //交互
    doms.close.onclick = close;
    doms.form.onsubmit = function(e){
        e.preventDefault();
        sendChat();
    };

    function scroll(){
        doms.chatContainer.scrollTop =doms.chatContainer.scrollHeight - doms.chatContainer.clientHeight;
    }
    async function sendChat(){
        const value = doms.txtMsg.value.trim();
        doms.txtMsg.value = '';
        if(!value) return;
        addChat({
            from:user.loginId,
            to:null,
            content:value,
            createdAt:Date.now()
        });
        scroll();
        const resp = await API.send(value);
        addChat({
            from:null,
            to:user.loginId,
            ...resp.data
        });
        scroll();
    }

    function close(){
        localStorage.removeItem('token');
        location.href = './login.html';
    }



    function addChat(chatInfo){
        const div = $$$('div');
        div.classList.add('chat-item');
        if(chatInfo.from){
            div.classList.add('me');
        }
        const img = $$$('img');
        img.classList.add('chat-avatar');
        img.src = chatInfo.from? "./asset/avatar.png":"./asset/robot-avatar.jpg";
        const content = $$$('div');
        content.classList.add('chat-content');
        content.innerText = chatInfo.content;
        const date = $$$('div');
        date.classList.add('chat-date');
        date.innerText = formatTime(chatInfo.createdAt);
        div.appendChild(img);
        div.appendChild(content);
        div.appendChild(date);
        doms.chatContainer.appendChild(div);
    }
    // addChat({
    //     content: "你好吗，今年几岁啦？",
    //     createdAt: 1673613266899,
    //     from: "wuwuhaha",
    //     to: null
    // });

    function formatTime(data){
        const date = new Date(data);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2,'0');
        const day = date.getDate().toString().padStart(2,'0');
        const hour = date.getHours().toString().padStart(2,'0');
        const minute =date.getMinutes().toString().padStart(2,'0');
        const second = date.getSeconds().toString().padStart(2,'0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
})()