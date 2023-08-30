<script lang="ts">
    import Button from "$lib/Button.svelte";
  import {onDestroy} from "svelte";
  import {subscribe, changeMode} from "$lib/store";

  let currentMode: "POMODORO" | "SHORT_BREAK" | "LONG_BREAK";
  const unsubscribe = subscribe((state) => {
    currentMode = state.mode;
  });
  onDestroy(unsubscribe);

</script>

<div>
  <Button 
    variant={currentMode === "POMODORO" ? "contained" : "outlined"}
    on:click={() => changeMode("POMODORO")}
  >
    Pomodoro
  </Button>
  <Button 
    variant={currentMode === "SHORT_BREAK" ? "contained" : "outlined"}
    on:click={() => changeMode("SHORT_BREAK")}
  >
    Short Break
  </Button>
  <Button 
    variant={currentMode === "LONG_BREAK" ? "contained" : "outlined"}
    on:click={() => changeMode("LONG_BREAK")}
  >
    Long Break
  </Button>
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
</style>
