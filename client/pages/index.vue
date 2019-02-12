<template>
  <div>
    <section class="container text-xs-center">
      <input id="input" type="number" v-model="number" placeholder="Enter a number">
      <button id="button" @click="submit(number)">SEND</button>
    </section>

    <div class="results-section" v-if="Object.values(numbers).length > 0">
      <span>Numbers sent:</span>

      <span v-for="(value, key, index) in numbers" :key="key">
        {{`For ${key}, you got ${value}`}}
        <span v-if="index !== Object.values(numbers).length - 1">|</span>
      </span>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'

export default {
  components: {
    Logo
  },
  data() {
    return {
      number: null,
      numbers: {}
    }
  },
  methods: {
    error() {
      const input = document.getElementById('input')
      const button = document.getElementById('button')

      input.classList.add('error')
      button.classList.add('error')

      setTimeout(() => {
        input.classList.remove('error')
        button.classList.remove('error')
      }, 1000)
    },
    success() {
      const input = document.getElementById('input')
      const button = document.getElementById('button')

      return new Promise(resolve => {
        input.classList.add('success')
        button.classList.add('success')

        setTimeout(() => {
          input.classList.remove('success')
          button.classList.remove('success')
          const sentNumber = this.number.slice()
          this.number = null
          resolve(sentNumber)
        }, 1000)
      })
    },
    submit(number) {
      if (!number) {
        this.error()
      } else {
        this.success().then(number => {
          axios
            .post('/api/number', {
              value: number
            })
            .then(res => {
              /// get array which we'll iterate over
              if (res) {
                this.numbers = res.data
              }
            })
            .catch(e => {
              console.log(e)
              this.error()
            })
        })
      }
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

input::placeholder {
  color: #55c8ec;
}

input {
  border: 2px solid rgb(85, 200, 236);
  background: #6ed4f3;
  border-right: none !important;
  padding: 0 10px;
  color: white;
  transition: all 0.4s ease-in;
}

input:focus,
button:focus {
  outline: none;
}

.error {
  outline: 2px solid rgb(255, 56, 56) !important;
}

button.error {
  background: rgb(255, 56, 56) !important;
}

.success {
  outline: 2px solid rgb(119, 255, 56) !important;
}

button.success {
  background: rgb(119, 255, 56) !important;
}

button {
  height: 28px;
  background: #55c8ec;
  color: white;
  border: none;
  transition: all 0.4s ease-in;
}
button:active {
  transform: scale(1.1);
}

.results-section {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 55%;
  color: #55c8ec;
  font-weight: 600;
  padding: 0 15%;
}
</style>
