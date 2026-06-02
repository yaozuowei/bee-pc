const path = require('path');
const fs = require('fs');
const Client = require('ssh2-sftp-client');
const sftp = new Client();

// const files = [path.join(__dirname, '.env.prod')];
// const files = ['.env.prod'];
const targetPath = '/home/source/bee_mall_pc/';
const files = ['.env.prod', '.env.test'];
sftp.on('upload', (info) => console.info(`已上传文件: ${info.source}`));

sftp.connect({
    host: '47.102.216.22',
    port: '22',
    username: 'root',
    password: 'Bee2022xmf22'
})
    .then(() => {
        files.forEach(async (item) => {
            console.info(`开始上传覆盖文件: ${item}`);
            await sftp.put(fs.createReadStream(path.join(__dirname, item)), `${targetPath}${item}`);
            console.info(`已上传覆盖文件: ${item}`);
        });
    })
    .then(() => {
        console.info(`移除文件：${`${targetPath}.nuxt`}`);
        return sftp.rmdir(`${targetPath}.nuxt`, true);
    })
    .then(() => {
        console.info(`已移除文件：${`${targetPath}.nuxt`}`);
        return sftp.uploadDir(path.join(__dirname, '.nuxt'), `${targetPath}.nuxt`);
    })
    .then(() => {
        sftp.end();
    })
    .catch((err) => {
        sftp.end();
        console.log(err, 'catch error');
    });
// ssh root@47.102.216.22
// pm2 restart "beeMall-pc"
