<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #f5f5f5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.app-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 2rem;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
}
</style>
