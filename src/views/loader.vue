<style lang="less" scoped>
// @import "../styles/common.css";
.loader {
  position: absolute;
  top: 50px;
  bottom: 0px;
  left: 55px;
  right: 0px;
  margin: auto;
  width: 65px;
  height: 65px;
}
@-webkit-keyframes line-spin-fade-loader {
  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 1;
  }
}

@keyframes line-spin-fade-loader {
  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 1;
  }
}

.line-spin-fade-loader {
  position: relative;
}
.line-spin-fade-loader > div:nth-child(1) {
  top: 20px;
  left: 0;
  -webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(2) {
  top: 13.63636px;
  left: 13.63636px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(3) {
  top: 0;
  left: 20px;
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(4) {
  top: -13.63636px;
  left: 13.63636px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(5) {
  top: -20px;
  left: 0;
  -webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(6) {
  top: -13.63636px;
  left: -13.63636px;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(7) {
  top: 0;
  left: -20px;
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
}
.line-spin-fade-loader > div:nth-child(8) {
  top: 13.63636px;
  left: -13.63636px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
  animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
}
.line-spin-fade-loader > div {
  background-color: #262a2b;
  width: 4px;
  height: 35px;
  border-radius: 2px;
  margin: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  position: absolute;
  width: 5px;
  height: 15px;
}
</style>

<template>
  <div class="loader">

    <div class="loader-inner line-spin-fade-loader" v-if="showloader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "loader",
  components: {},
  data() {
    return {
      showloader: false
    };
  },
  computed: {},
  created() {
    window.setTimeout(() => {
      this.showloader = true;
    }, 200);
  },
  mounted() {},
  methods: {},
  destroyed() {},
  watch: {}
};
</script>