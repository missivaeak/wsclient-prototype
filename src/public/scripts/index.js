const loginBtn = document.getElementById("loginBtn");
const connectBtn = document.getElementById("connectBtn");
let socket;
const sendBtn = document.getElementById("sendBtn");
const disconnectBtn = document.getElementById("disconnectBtn");

loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const loginName = document.getElementById("loginName").value;
    const password = document.getElementById("password").value;
    const selected = document.getElementById("loginType").selectedOptions[0];
    let endpoint;
    let loginNameProperty;


    switch (selected) {
        case document.getElementById("customerOption"):
            endpoint = "customer/token";
            loginNameProperty = "email";
            break;
        case document.getElementById("scooterOption"):
            endpoint = "scooter/token"
            loginNameProperty = "scooterId";
            break;
        case document.getElementById("adminOption"):
            endpoint = "admin/token"
            loginNameProperty = "username";
            break;
    }

    Http
        .post("http://localhost:1337/" + endpoint, {
            [loginNameProperty]: loginName,
            password
        })
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            const token = document.getElementById("token");
            token.value = result.data.token;
        })
        
    console.log(loginName, password);
});

connectBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const host = document.getElementById("host").value;
    const token = document.getElementById("token").value;

    socket = new WebSocket(host, token);
    socket.onmessage = (event) => {
        const output = document.getElementById("output");
        let textarea = output.value.split('\n');
        textarea.push(event.data);
        if (textarea.length > 20) {
            textarea = textarea.slice(1).slice(-20);
        }
        const newOutput = textarea.join('\n');
        output.value = newOutput;
    };

    connectBtn.disabled = true;
    disconnectBtn.disabled = false;
    sendBtn.disabled = false;
})


sendBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const input = document.getElementById("input").value;

    socket.send(input);
});


disconnectBtn.addEventListener('click', (event) => {
    event.preventDefault();

    socket.close();

    connectBtn.disabled = false;
    disconnectBtn.disabled = true;
    sendBtn.disabled = true;
})