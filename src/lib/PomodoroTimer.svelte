<script lang="ts">
  import {type PomodoroStore, subscribe} from "$lib/store";
  import { onDestroy } from "svelte";

  let pomodoro: PomodoroStore;
  const unsubscribe = subscribe((state) => {
    pomodoro = state;
  });

  const padWithZeros = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${padWithZeros(minutes)}:${padWithZeros(seconds)}`;
  };

  onDestroy(() => {
    unsubscribe();
  });
</script>

<svelte:head>
  <title>{formatTime(pomodoro.time)} | Pomodoro</title>
</svelte:head>

<time>
  {formatTime(pomodoro.time)}
</time>

<style>
  time {
    font-size: 8rem;
    font-weight: 300;
    color: var(--text);
  }
</style>
