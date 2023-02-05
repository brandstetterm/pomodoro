<script>
  import "../app.css";
</script>

<main>
  <slot />
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
</style>

