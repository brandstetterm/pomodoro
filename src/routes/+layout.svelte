<script>
  import "../app.css";
</script>

<main>
  <slot />
  <a href="https://github.com/brandstetterm/pomodoro">
    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M84,240a23.9,23.9,0,0,0,24-24V168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M172,240a23.9,23.9,0,0,1-24-24V168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M152,168h16a23.9,23.9,0,0,1,24,24v8a23.9,23.9,0,0,0,24,24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M104,168H88a23.9,23.9,0,0,0-24,24v8a23.9,23.9,0,0,1-24,24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M111.8,64A52,52,0,0,0,68,40a52,52,0,0,0-3.5,44.7A49.3,49.3,0,0,0,56,112v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.3,49.3,0,0,0-8.5-27.3A52,52,0,0,0,188,40a52,52,0,0,0-43.8,24Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
  </a>
</main>

<style>
  main {
    position: fixed;
    inset: 0;
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background-color: #242c3d;
  }


  svg {
    height: 100%;
    width: 100%;
  }

  a {
    color: #ff0057;
    height: 32px;
    width: 32px;
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
    border-radius: 999px;
    cursor: pointer;
    position: absolute;
    top: 16px;
    left: 16px;
  }
  a:hover {
    transform: scale(1.05);
  }
</style>

