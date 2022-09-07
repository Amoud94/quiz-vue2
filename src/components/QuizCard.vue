<template>
  <div class="container">

    <!-- quiz -->
    <template v-if="!disableSelection">
      <div class="imgContainer">
        <img :src="currentQuestion.image" alt="">
      </div>
      <div class="questionsContainer">
        <!-- step, timer -->
        <div class="row">
          <div class="step">{{ currentStep }}</div>
          <div class="timer">{{ countDown }}</div>
        </div>
        <!-- question -->
        <div class="question">
          {{ currentQuestion.label }}
        </div>
        <!-- choices -->
        <div class="row">
          <div v-for="answer in currentQuestion.answers" :key="answer.id"
               :class="['response', {active: answer.id === selectedAnswer.id}]" @click="selectedAnswer = answer">
            <input type="radio" :id="answer.id" :value="answer" :name="currentQuestion.id" v-model="selectedAnswer"
                   style="display: none"><label :for="answer.id">{{ answer.label }}</label>
          </div>
        </div>
        <div class="nextBtn" @click="nextQuestion">
          Next
        </div>
      </div>
    </template>

    <!-- result/score -->
    <div class="resultContainer" v-else>
      <p>le projet consiste en un quiz qui comprend un timing et note spécifique pour chaque question<br>your final
        result for this quiz is : </p>
      <p class="result"><span>{{ score }}</span>/5</p>
      <input v-model="name" type="text" placeholder="Please enter your name">
      <div class="confirmBtn" @click="confirmResult">
        Confirm your test
      </div>
      <div class="restartBtn" @click="restartQuiz">
        Restart Test
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "QuizCard",
  data() {
    return {
      index: 0,
      qstTiming: '',
      timeout: '',
      selectedAnswer: '',
      result: [],
      disableSelection: false,
      name:'',
      // notification top-end setup
      Toast : this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      })
    };
  },
  computed: {
    questions() {
      return this.$store.state.questions
    },
    currentQuestion() {
      return this.questions[this.index]
    },
    currentStep() {
      return `${this.index + 1} - ${this.questions.length}`
    },
    countDown() {
      let minute = Math.floor(this.qstTiming / 60)
      let seconds = this.qstTiming % 60
      minute = minute < 10 ? '0' + minute : minute
      seconds = seconds < 10 ? '0' + seconds : seconds
      return minute + ':' + seconds
    },
    score() {
      return this.result.filter((answer => answer.resp?.correct)).length
    }
  },
  methods: {
    countDownTimer() {
      if (this.qstTiming === 0) {
        this.nextQuestion()
      } else {
        this.timeout = setTimeout(() => {
          this.qstTiming--
          this.countDownTimer()
        }, 1000)
      }
    },
    nextQuestion() {
      let obj = {
        'qst_id': this.currentQuestion.id,
        'qst_label': this.currentQuestion.label,
        'resp': this.selectedAnswer,
      }
      this.result.push(obj)
      this.selectedAnswer = ''
      if (this.index < this.questions.length - 1) {
        this.index++
        this.qstTiming = this.currentQuestion.time
        clearTimeout(this.timeout)
        this.countDownTimer()
      } else {
        this.disableSelection = true
      }
    },
    confirmResult() {
      if(this.name) {
        this.$store.dispatch("setResult", {"name": this.name, "score": this.score})
        // success notification
        this.$swal.fire(
            'Done!',
            'Result saved successfully',
            'success'
        )
      }else{
        // error notification
        this.Toast.fire({
          icon: 'error',
          title: 'Please make sure to enter your name before submitting the final result',
        })
      }
    },
    restartQuiz() {
      clearTimeout(this.timeout)
      this.index = 0
      this.hideNextBtn = false
      this.disableSelection = false
      this.result = []
      this.qstTiming = this.currentQuestion.time
      this.countDownTimer()
    }
  },
  mounted() {
    this.qstTiming = this.currentQuestion.time
    this.countDownTimer()
  },
  unmounted() {
    clearTimeout(this.timeout)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 5vw;
  text-align: start;
}

.imgContainer {
  height: 400px;
  width: 400px;
  background-color: #2c3e50;
  flex: 1;
  margin-right: 5vw;
}

.imgContainer img {
  height: 100%;
  width: 100%;
}

.questionsContainer {
  flex: 2;
  height: 400px;

}

.questionsContainer .row:first-child {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

.questionsContainer .step {
  background: blue;
  padding: 10px 20px;
  border: 1px solid;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.questionsContainer .timer {
  padding: 10px 15px;
  font-size: 18px;
  font-weight: bold;
  color: blue;
}


.questionsContainer .question {
  padding: 10px 15px;
  border-top: 1px solid lightgray;
  font-size: 18px;
}


.questionsContainer .response {
  padding: 10px 15px;
  margin: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background: lightgray;
  cursor: pointer;
}

.questionsContainer .response.active {
  background-color: lightslategray !important;
}


.nextBtn,
.submitBtn {
  margin: 30px 10px;
  float: right;
  cursor: pointer;
  padding: 10px 50px;
  background-color: green;
  color: white;
  border-radius: 5px;
}

.nextBtn:hover,
.submitBtn:hover {
  background: darkolivegreen;
}

.resultContainer {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
.resultContainer .result span{
  color: #0f7f12;
  font-size: 25px;
}
.resultContainer .confirmBtn {
  padding: 10px;
  background: green;
  width: 25%;
  margin: 10px auto;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.resultContainer .restartBtn {
  padding: 10px;
  background: white;
  width: 25%;
  margin: 10px auto;
  border: 1px solid black;
  border-radius: 8px;
  cursor: pointer;
}
.resultContainer input{
  padding: 10px;
  width: 50%;
  border-radius: 6px;
  border: .5px solid #00000029;
}

.resultContainer .confirmBtn:hover {
  background: darkolivegreen;
}

.resultContainer .restartBtn:hover {
  background: lightgray;
}
</style>