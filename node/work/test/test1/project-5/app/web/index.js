var net = require('net');

// создает сервер
var server = net.createServer();

//генерируется при закрытии сервера ... не генерируется, пока не будут закрыты все соединения.
server.on('close',function(){
    console.log('Server closed !');
});

// испускается, когда новый клиент подключается
server.on('connection',function(socket){

// это свойство показывает количество символов, которые в настоящее время буферизированы для записи.
// (Количество символов примерно равно количеству байтов, которые нужно записать, но буфер может содержать
// строки, а строки кодируются лениво, поэтому точное количество байтов неизвестно.)

// Пользователи, у которых наблюдается большой или растущий размер буфера, должны попытаться
// «задросселировать» потоки данных в своей программе с помощью pause () и resume ().

    console.log('Buffer size : ' + socket.bufferSize);

    console.log('---------server details -----------------');

    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Server is listening at port' + port);
    console.log('Server ip :' + ipaddr);
    console.log('Server is IP4/IP6 : ' + family);

    var lport = socket.localPort;
    var laddr = socket.localAddress;
    console.log('Server is listening at LOCAL port' + lport);
    console.log('Server LOCAL ip :' + laddr);

    console.log('------------remote client info --------------');

    var rport = socket.remotePort;
    var raddr = socket.remoteAddress;
    var rfamily = socket.remoteFamily;

    console.log('REMOTE Socket is listening at port' + rport);
    console.log('REMOTE Socket ip :' + raddr);
    console.log('REMOTE Socket is IP4/IP6 : ' + rfamily);

    console.log('--------------------------------------------')
//var no_of_connections =  server.getConnections(); // sychronous version
    server.getConnections(function(error,count){
        console.log('Number of concurrent connections to the server : ' + count);
    });

    socket.setEncoding('utf8');

    socket.setTimeout(800000,function(){
        // вызывается после тайм-аута -> так же, как socket.on ('timeout')
        // он просто сообщает, что истекло время ожидания сокета => его задание ur по завершению или уничтожению сокета.
        // socket.end () vs socket.destroy () => end позволяет нам отправить окончательные данные и позволяет завершить
        // некоторые операции ввода-вывода перед разрушением сокета
        // тогда как уничтожение немедленно уничтожает сокет, независимо от того, выполняется какая-либо операция
        // ввода-вывода или нет ... выполняется принудительное уничтожение

        console.log('Socket timed out');
    });


    socket.on('data',function(data){
        var bread = socket.bytesRead;
        var bwrite = socket.bytesWritten;
        console.log('Bytes read : ' + bread);
        console.log('Bytes written : ' + bwrite);
        console.log('Data sent to server : ' + data);

        //echo data
        var is_kernel_buffer_full = socket.write('Data ::' + data);
        if(is_kernel_buffer_full){
            console.log('Данные были успешно удалены из буфера ядра, т.е. успешно записаны!');
        }else{
            socket.pause();
        }

    });

    socket.on('drain',function(){
        console.log('write buffer is empty now .. u can resume the writable stream');
        socket.resume();
    });

    socket.on('error',function(error){
        console.log('Error : ' + error);
    });

    socket.on('timeout',function(){
        console.log('Socket timed out !');
        socket.end('Timed out!');
        // can call socket.destroy() here too.
    });

    socket.on('end',function(data){
        console.log('Socket ended from other end!');
        console.log('End data : ' + data);
    });

    socket.on('close',function(error){
        var bread = socket.bytesRead;
        var bwrite = socket.bytesWritten;
        console.log('Bytes read : ' + bread);
        console.log('Bytes written : ' + bwrite);
        console.log('Socket closed!');
        if(error){
            console.log('Socket was closed coz of transmission error');
        }
    });

    setTimeout(function(){
        var isdestroyed = socket.destroyed;
        console.log('Socket destroyed:' + isdestroyed);
        socket.destroy();
    },1200000);

});

// emits when any error occurs -> calls closed event immediately after this.
server.on('error',function(error){
    console.log('Error: ' + error);
});

//emits when server is bound with server.listen
server.on('listening',function(){
    console.log('Server is listening!');
});

server.maxConnections = 10;

//static port allocation
server.listen(2222);


// for dyanmic port allocation
server.listen(function(){
    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Server is listening at port' + port);
    console.log('Server ip :' + ipaddr);
    console.log('Server is IP4/IP6 : ' + family);
});



var islistening = server.listening;

if(islistening){
    console.log('Server is listening');
}else{
    console.log('Server is not listening');
}

setTimeout(function(){
    server.close();
},5000000);


//---------------------client----------------------

// creating a custom socket client and connecting it....
var client  = new net.Socket();
client.connect({
    port:2222
});

client.on('connect',function(){
    console.log('Client: connection established with server');

    console.log('---------client details -----------------');
    var address = client.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Client is listening at port' + port);
    console.log('Client ip :' + ipaddr);
    console.log('Client is IP4/IP6 : ' + family);


    // writing data to server
    client.write('hello from client');

});

client.setEncoding('utf8');

client.on('data',function(data){
    console.log('Data from server:' + data);
});

setTimeout(function(){
    client.end('Bye bye server');
},5000);

//NOTE:--> all the events of the socket are applicable here..in client...


// -----------------creating client using net.connect instead of custom socket-------

// server creation using net.connect --->
// u can also => write the below code in seperate js file
// open new node instance => and run it...


// const clients = net.connect({port: 2222}, () => {
//     // 'connect' listener
//     console.log('connected to server!');
//     clients.write('world!\r\n');
// });
// clients.on('data', (data) => {
//     console.log(data.toString());
//     clients.end();
// });
// clients.on('end', () => {
//     console.log('disconnected from server');
// });