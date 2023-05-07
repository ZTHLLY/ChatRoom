<!--  -->
<template>
    <main class="main" style="margin: 0; padding: 0;">
        <section class="spotlight parallax bg-cover bg-size--cover" data-spotlight="fullscreen" style="background-image: url('https://s2.loli.net/2022/10/30/GPsh4OSpYNrRKI9.jpg');background-size: cover;">
          <span class="mask bg-tertiary alpha-7"></span>
          <div class="spotlight-holder py-lg pt-lg-xl">
            <div class="container d-flex align-items-center no-padding">
              <div class="col">
                <div class="row cols-xs-space align-items-center text-center text-md-left justify-content-center">
                  <div class="col-lg-7">
                    <div class="text-center mt-5">
                      <h1 class="heading h1 text-white">
                        Hi, nice to meet you!
                      </h1>
                      <p class="lead lh-180 text-white mt-3">
                        Here you can find my major, hobby, courses that I have taken, etc.
                      </p>
                      <div class="mt-5">
                        <a class="btn btn-primary mr-3" @click="dialogFormVisible = true">Entering to chat</a>
                        <router-link to="/" class="btn btn-secondary">Back to Home</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="slice sct-color-1">
          <div class="container">
            <div class="row cols-xs-space cols-sm-space align-items-center">
              <div class="col-md-6">
                <img src="../../assets/images/prv/hacker_2300772.jpg" class="img-center img-fluid rounded z-depth-3">
              </div>
              <div class="col-md-6 col-lg-5 ml-lg-auto">
                <div class="pr-md-4">
                  <h3 class="heading heading-3 strong-500">
                    CTF challenges
                  </h3>
                  <p class="lead text-gray mt-4">
                    Capture the Flag (CTF) in computer security is an exercise in which "flags" are secretly hidden in purposefully-vulnerable programs or websites. It can either be for competitive or educational purposes. And I am good at 'pwn' aspect
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="container-fluid px-0">
            <div class="card-group flex-column flex-md-row">
              <div class="card bg-primary text-white px-4 px-lg-5 py-5 rounded-0 border-0 mb-0">
                <div class="card-body">
                  <h1 class="heading h2 text-white">My blog</h1>
                  <p class="mt-4">
                    You can find some study notes in my blog, maybe it is not perfect enough, but you can know me more in here.Here you can find some algorithm and cyber security notes.
                  </p>
                  <a href="https://zthlly.github.io/" class="btn btn-secondary mt-4">Learn more</a>
                </div>
              </div>
              <div class="card bg-secondary px-4 px-lg-5 py-5 rounded-0 border-0 mb-0">
                <div class="card-body">
                  <h1 class="heading h2">My github</h1>
                  <p class="mt-4">
                    You can find my work in github, including some software design like minipromrame, little games designed by java, CTF challenges and vue framework project, etc.
                  </p>
                  <a href="https://github.com/ZTHLLY" class="btn btn-primary mt-4">Learn more</a>
                </div>
              </div>
              <div class="card bg-tertiary text-white px-4 px-lg-5 py-5 rounded-0 border-0 mb-0">
                <div class="card-body">
                  <h1 class="heading h2 text-white">My email</h1>
                  <p class="mt-4">
                    You can find me here or just send email to me, I will send the respond when I am free. email address: <strong>2350354569@qq.com</strong>
                  </p>
                  <a href="https://mail.qq.com/" class="btn btn-secondary mt-4">Learn more</a>
                </div>
              </div>
            </div>
          </div>
      </section>
  

  
      <section class="slice slice-lg">
        <div class="container">
          <div class="mb-5 text-center">
            <h3 class="heading h2">What I prefer to do when I am free</h3>
            <div class="fluid-paragraph text-center">
              <p class="lead mb-0">Reading and Sport</p>
            </div>
          </div>
          <div class="row cols-md-space cols-sm-space cols-xs-space">
            <div class="col-lg-4">
              <div class="card border-0">
                <img src="../../assets/images/prv/reading.jpg" class="img-fluid img-center rounded z-depth-2" style="height: 265px;">
                <div class="pt-4">
                  <span class="text-muted">Reading</span>
                  <a href="#" class="heading h4 d-block mt-1">Listen to the literature</a>
                  <p class="mt-3">
                    When we struck in the puzzle, jump out and read, which can help us be ready for the next challenge.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card border-0">
                <img src="../../assets/images/prv/football.jpg" class="img-fluid img-center rounded z-depth-2">
                <div class="pt-4">
                  <span class="text-muted">Football</span>
                  <a href="#" class="heading h4 d-block mt-1">Sweat in the playground</a>
                  <p class="mt-3">
                    When we strive to become better than we are, everything around us becomes better, too.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card border-0">
                <img src="../../assets/images/prv/travel.jpg" class="img-fluid img-center rounded z-depth-2" style="height: 265px;">
                <div class="pt-4">
                  <span class="text-muted">Travel</span>
                  <a href="#" class="heading h4 d-block mt-1">Listen to the nature</a>
                  <p class="mt-3">
                    Travel is a way to listen to the nature, which you can feel different culture and wonderful scenery.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>


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

</template>

<script>
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';


export default {
    name: 'about',
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

            if (this.form.name.length == 0) {
                alert('用户名不可为空');
                return
            }
            this.dialogFormVisible = false;
            this.$router.push({ name: "chat", query: { account: this.form.name,uuid: this.uuid } })
        },
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