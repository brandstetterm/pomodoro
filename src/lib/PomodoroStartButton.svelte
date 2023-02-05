<script lang="ts">
  import {subscribe, start, pause, type PomodoroStore} from "$lib/store";
    import { onDestroy } from "svelte";

  let pomodoro: PomodoroStore;
  const unsubscribe = subscribe((state) => {
    pomodoro = state;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

{#if pomodoro.status === "RUNNING"}
  <button 
    on:click={pause}
  >Pause</button>
{:else}
  <button 
    on:click={start}
  >Start</button>
{/if}

<style>
  button {
    border: none;
    border-radius: 9999px;
    padding: 8px 32px;
    font-weight: 500;
    font-size: 16px;
    font-family: "Ubuntu", sans-serif;
    cursor: pointer;
    color: #fff;
    background-color: #ff0057;
    transition: all 100ms linear;
  }
  button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px 0 rgba(255, 0, 87, 0.2);
  }
</style>
