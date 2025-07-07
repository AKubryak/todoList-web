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
  background: linear-gradient(90deg, #ffffff, #cfd8f8, #ffffff);
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.app-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  margin: 0 auto;
  max-width: 75vw;
  max-height: 90vh;
  overflow: hidden;
  width: 100%;
}

@media (max-width: 768px) {
  #app {
    padding: 0;
    align-items: stretch;
  }

  .app-container {
    padding: 1rem;
    border-radius: 0;
    max-width: 100%;
    max-height: none;
    min-height: 100vh;
    box-shadow: none;
  }
}
</style>
