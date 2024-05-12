<template>
  <div>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
  </div>
</template>

<script>
export default {
  name: "Loading"
}
</script>

<style scoped>
div {
  position: absolute;
  top: 50%; left: 50%;
  display: flex;
  z-index: 1000;
}
div span {
  width: 6px;
  height: 20px;
  background-color: black;
  margin: 0 4px;
  animation: animate .7s infinite alternate;
}
@keyframes animate {
  0% {
    transform: scaleY(1);
  }
  25% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1);
  }
  75% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(3);
  }
}
div span:nth-child(1) {
  animation-delay: .1s;
}
div span:nth-child(2) {
  animation-delay: .2s;
}
div span:nth-child(3) {
  animation-delay: .3s;
}
div span:nth-child(4) {
  animation-delay: .4s;
}
div span:nth-child(5) {
  animation-delay: .5s;
}
div span:nth-child(6) {
  animation-delay: .6s;
}
</style>