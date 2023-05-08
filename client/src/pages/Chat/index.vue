<!--  -->
<template>
    <header>
        <router-link to="/" class="btn btn-primary mr-3" style="float: left;">Back</router-link>
        <router-link to="/about" class="btn btn-secondary" style="float: right;">About</router-link>
        <h1>Chat Room</h1>

    </header>



    <div>
        <!-- UserList, showing all user and their status -->
        <div class="userList">

            <el-table :data="tableData" height="500" stripe style="width: 100%">
                <el-table-column prop="name" label="Users" />
                <el-table-column prop="status" label="Status" />
            </el-table>
        </div>
        <!-- the chat window -->
        <el-scrollbar max-height="500px" style="width: 1000px;display: inline-block;height: 500px;" class="chatRoom">
            <div v-for="item in message" :key="item"
                :class="item.uuid == this.$route.query.uuid ? 'scrollbar-demo-item2' : 'scrollbar-demo-item'">
                <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                    :class="item.uuid == this.$route.query.uuid ? 'pic2' : 'pic'">
                <div :class="item.uuid == this.$route.query.uuid ? 'container2' : 'container'">
                    <div :class="item.uuid == this.$route.query.uuid ? 'account2' : 'account'">{{ item.account }}</div>
                    <p :class="item.uuid == this.$route.query.uuid ? 'msg2' : 'msg'">{{ item.message }}</p>
                </div>
            </div>
        </el-scrollbar>
    </div>
    <!-- input and submit -->
    <el-input style="width: 630px; margin-bottom: 68px;" @keydown.enter="submit" v-model="input"
        placeholder="Please input" />
    <el-button type="primary" @click="submit" style="margin-bottom: 68px;">submit</el-button>

    <footer>
        <p>&copy; 2023 chat room</p>
    </footer>
</template>

<script>
import io from 'socket.io-client';
import { ElInput, ElNotification, ElButton, ElTable } from 'element-plus';
import { ref } from 'vue';




export default {
    name: 'chat',
    data() {
        return {
            input: '',
            count: [''],
            message: [],
            tableData: [],
            socket: ''
        }
    },
    mounted() {
        console.log('挂载完毕')

        // const socket = io('http://si1v3r.nat300.top');
        const socket = io('http://localhost:3030');//connect to server
    
        this.socket=socket
        this.getMsg(socket)

    },
    components: {
        ElInput
    },
    watch:{
        input: function(newVal,oldVal){
            if(oldVal==''){
                console.log('user typing.....')
                var req={account: this.$route.query.account, uuid: this.$route.query.uuid, status: 'typing'}
                this.socket.emit('status',req)
            }
            else if(newVal==''){
                console.log('user listening....')
                var req={account: this.$route.query.account, uuid: this.$route.query.uuid, status: 'listening'}
                this.socket.emit('status',req)
            }
        }//listen the input value and change the status window
    },
    methods: {
        submit() {
            if (this.input.length == 0) alert('The input can not be empty')
            else {
                this.submitMsg(this.input)
                this.input = '';
            }

        },
        async getMsg(socket) {

            socket.on('connect', () => {
                console.log('connected to server');
            });

            socket.on('allMessage', (res) => {
                this.message = res
            })

            socket.on('notification', (res) => {
                ElNotification({
                    title: 'Info',
                    message: `${res} is coming into the chat room`,
                    type: 'info'
                })
            })

            socket.on('userList',(res)=>{
                for(var a=this.tableData.length;a<res.length;a++){
                    var temp={name: res[a].account, status: 'listening'}
                    this.tableData.push(temp)
                }
            })

            const result = await new Promise((resolve) => {
                socket.emit('accountAndUuid', [this.$route.query.account, this.$route.query.uuid], (data) => {
                    resolve(data)
                })
            })
            console.log('result=>', result)

            

            socket.on('userLeave',(res)=>{
                ElNotification({
                    title: 'Info',
                    message: `${res.account} is leaving the chat room`,
                    type: 'warning'
                })
            })

            socket.on('status',(res)=>{
                for(var a=0;a<this.tableData.length;a++){
                    if(this.tableData[a].name==res.account){
                        this.tableData[a].status=res.status;
                    }
                }
            })

            // socket.disconnect();
        },//load the history message
        async submitMsg(msg) {
            const socket=this.socket

            var data = {
                account: this.$route.query.account,
                uuid: this.$route.query.uuid,
                message: msg
            };
            console.log('data=>',data)
            const result = await new Promise((resolve) => {
                socket.emit('submitMsg', data, (res) => {
                    resolve(res)
                })
            });
            this.message = result
            console.log(this.message)

        },//submit the user's message

    }
}
</script>

<style scoped>
@import url('../../assets/theme.css');
@import url('https://fonts.googleapis.com/css?family=Nunito:400,600,700,800|Roboto:400,500,700');

.scrollbar-demo-item {
    display: flex;
    text-align: left;
    height: 50px;
    margin: 10px;
    border-radius: 4px;
    background: #fbf7f7;
    color: black;
}

.scrollbar-demo-item2 {
    text-align: right;
    height: 50px;
    margin: 10px;
    border-radius: 4px;
    background: #fbf7f7;
    color: black;
    background-color: #95ec69;
}

.pic {
    width: 50px;
    height: 50px;
    float: left;
}

.pic2 {
    width: 50px;
    height: 50px;
    float: right;
}

.account {
    height: 17px;
    font-size: 1px;
    line-height: 17px;
    margin-left: 10px;
    color: rgb(16, 101, 101);
}

.account2 {
    height: 17px;
    font-size: 1px;
    line-height: 17px;
    margin-left: 10px;
    color: rgb(16, 101, 101);
    padding-right: 10px;
}

.msg {
    height: 30px;
    margin: 0 0;
    font-size: 18px;
    display: inline-block;
    margin-left: 10px;
    border-radius: 4px;
    line-height: 30px;
}

.msg2 {
    height: 30px;
    margin: 0 0;
    font-size: 18px;
    display: inline-block;
    margin-left: 10px;
    border-radius: 4px;
    line-height: 30px;
    padding-right: 10px;
}

.container {
    height: 50px;
    display: flex;
    flex-direction: column;
}

.container2 {
    height: 50px;
    display: flex;
    flex-direction: column;
}

.chatRoom {
    background-color: rgba(0, 0, 0, .05);
    float: left;
    box-shadow: 10px 0 8px 10px rgba(0, 0, 0, .3);
    margin-bottom: 10px;
}

footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
}

header {
    margin-bottom: 50px;
    background-color: #f8d2d2;
    height: 50px;
}

header h1 {
    color: black;
}

.userList {
    box-shadow: -10px 0 10px 10px rgba(0, 0, 0, .2);
    margin-right: 5px;
    float: left;
    margin-left: 100px;
}
</style>