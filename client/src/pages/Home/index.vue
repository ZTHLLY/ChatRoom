<!--  -->
<template>

<!-- background image and button -->
    <section class="spotlight parallax bg-cover bg-size--cover" data-spotlight="fullscreen" style="background-image: url('https://s2.loli.net/2022/11/27/SdAPiMOEJ3FLfTt.jpg');background-size: cover;">
        <span class="mask bg-tertiary alpha-7"></span>
        <div class="spotlight-holder py-lg pt-lg-xl">
          <div class="container d-flex align-items-center no-padding">
            <div class="col">
              <div class="row cols-xs-space align-items-center text-center text-md-left justify-content-center">
                <div class="col-lg-7">
                  <div class="text-center mt-5">
                    <h1 class="heading h1 text-white">
                      Hi, nice to meet you! My name is si1v3r. Welcome to my chat room. Wish you have a woderful day &nbsp; ^_^
                    </h1>
                    <p class="lead lh-180 text-white mt-3">
                      If you want to know more about me, try to click the 'about me' button, or you can just entering the chat room and start chatting
                    </p>
                    <div class="mt-5">
                      <a class="btn btn-primary mr-3" @click="dialogFormVisible = true">Entering to chat</a>
                      <router-link to="/about" class="btn btn-secondary">about me</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="slice-lg">
        <div class="container">
          <div class="row align-items-center cols-xs-space cols-sm-space cols-md-space">
            <div class="col-lg-6 order-lg-2 ml-lg-auto">
              <div class="block block-image">
                <img src="../../assets/images/prv/device-1.png" class="img-fluid img-center">
              </div>
            </div>
            <!-- My name and basic information -->
            <div class="col-lg-5 order-lg-1">
              <div class="row-wrapper">
                <div class="row">
                  <div class="col">
                    <div class="d-flex align-items-start">
                      <div class="icon icon-lg">
                        <i class="fab fa-twitter"></i>
                      </div>
                      <div class="icon-text">
                        <h3 class="heading h4">My name</h3>
                        <p>My name is Ruiming Zhu, with ID 20213802059 in SCNU and ID 50079796 in UoA. You can also call me <strong>si1v3r</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="d-flex align-items-start">
                      <div class="icon icon-lg">
                        <i class="fab fa-sass"></i>
                      </div>
                      <div class="icon-text">
                        <h3 class="heading h4">My major</h3>
                        <p>I major in software engineering in school. And I also have interest in cyber security</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    <!-- Form -->
    <!-- <el-button text @click="dialogFormVisible = true">
        进入聊天室
    </el-button> -->

    <el-dialog v-model="dialogFormVisible" title="Before entering" style="width: min-content;">
        <el-form :model="form">
            <el-form-item label="decide a user name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">cancel</el-button>
                <el-button type="primary" @click="goToChat">
                    confirm
                </el-button>
            </span>
        </template>
    </el-dialog>


    <!-- <router-link to="/about">跳转关于</router-link> -->
</template>

<script>
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';


export default {
    name: 'home',
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            },
            dialogFormVisible: false,
            allaccount: [],
            uuid: ''
        }
    },
    mounted() {

        this.getuuid()
    },
    methods: {
        goToChat() {
            // get user's name
            if (this.form.name.length == 0) {
                alert('the user name can not be empty');
                return
            }
            this.dialogFormVisible = false;
            this.$router.push({ name: "chat", query: { account: this.form.name,uuid: this.uuid } })
        },
        // give every user a uuid
        getuuid() {
            const uuid = uuidv4();
            this.uuid=uuid;
        }
    }
}
</script>

<style scoped>
@import url('../../assets/theme.css');
@import url('https://fonts.googleapis.com/css?family=Nunito:400,600,700,800|Roboto:400,500,700');
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 100px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>