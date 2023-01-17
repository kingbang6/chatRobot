var API = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_key = "token";

  function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_key);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      headers,
    });
  }

  function post(path, bodyObj) {
    const headers = {
      "content-Type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_key);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyObj),
    });
  }

  async function reg(userInfo) {
    const resp = await post("/api/user/reg", userInfo);
    return await resp.json();
  }

  async function login(loginInfo) {
    const resp = await post("/api/user/login", loginInfo);
    const body = await resp.json();
    if (!body.code) {
      const token = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_key, token);
    }
    return body;
  }

  async function yanzheng(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
  }

  async function nowUer() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  async function send(content) {
    const resp = await post("/api/chat", { content });
    return await resp.json();
  }

  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }

  function loginOut() {
    localStorage.removeItem(TOKEN_key);
  }

  return{
    reg,
    login,
    yanzheng,
    nowUer,
    send,
    getHistory,
    loginOut
  }
})();
