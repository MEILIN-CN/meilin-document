// 动态加载 jQuery
const script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
script.type = 'text/javascript';
document.head.appendChild(script);

// 定义 API 配置
const API_CONFIG = {
    url: 'https://mcapi.bioc.fun', // 这里替换成正确的 API URL
    data: {
        ip: 'play.bioc.fun',
        port: '4833'
    },
    dataType: 'json'
};

var hasData = false;

// 定义更新页面数据的函数
function updatePageData(res) {
    if (res.code === 200) {
        hasData = true;
        // 更新页面数据
        $("#status").html(res.status);
        $("#ip").html(res.ip);
        $("#port").html(res.port);
        $("#agreement").html(res.agreement);
        $("#real").html(res.real);
        $("#location").html(res.location);
        $("#motd").html(res.motd);
        $("#version").html(res.version);
        $("#online").html(res.online);
        $("#max").html(res.max);
        $("#gamemode").html(res.gamemode);
        $("#delay").html(res.delay);
    } else {
        // 更新所有字段为 "无法连接"
        
        if(!hasData)
            $("[id='status'], [id='ip'], [id='port'], [id='agreement'], [id='real'], [id='location'], [id='motd'], [id='version'], [id='online'], [id='max'], [id='gamemode'], [id='delay']").html("无法连接");
    }
}

// 定义 AJAX 请求的函数
function fetchData() {
    $.ajax({
        url: API_CONFIG.url,
        data: API_CONFIG.data,
        dataType: API_CONFIG.dataType,
        success: function(res) {
            updatePageData(res);
        },
        error: function(xhr, status, error) {
            console.error(`请求失败: ${status} (${error})`);
            updatePageData({ code: 500 }); // 模拟非200状态
        }
    });
}

// 设置 AJAX 定时访问服务端，这里设置为每3秒请求一次
setInterval(fetchData, 3000);