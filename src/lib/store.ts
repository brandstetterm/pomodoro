import {writable} from "svelte/store";

export type PomodoroStore = {
  status: "IDLE" | "COMPLETED" | "PAUSED" | "RUNNING";
  mode: "POMODORO" | "SHORT_BREAK" | "LONG_BREAK";
  interval: NodeJS.Timer | undefined;
  time: number;
};

const {subscribe, update} = writable<PomodoroStore>({
  status: "IDLE",
  mode: "POMODORO",
  interval: undefined,
  time: 1500,
});

const setPomodoro = (mode: "POMODORO" | "SHORT_BREAK" | "LONG_BREAK") => {
  update((pomodoro) => {
    pomodoro.status = "IDLE";
    pomodoro.mode = mode;
    switch (mode) {
      case "POMODORO": pomodoro.time = 1500; break;
      case "SHORT_BREAK": pomodoro.time = 300; break;
      case "LONG_BREAK": pomodoro.time = 900; break;
    }
    clearInterval(pomodoro.interval);
    pomodoro.interval = undefined;
    return pomodoro;
  });
};

const startPomodoro = () => {
  update((pomodoro) => {
    if (!pomodoro.interval) {
      pomodoro.status = "RUNNING";
      pomodoro.interval = setInterval(() => {
        update((pomodoroState) => {
          if (pomodoroState.time > 0) {
            pomodoroState.time = pomodoroState.time - 1;
          } else {
            pomodoroState.status = "COMPLETED";
            clearInterval(pomodoroState.interval);
            pomodoroState.interval = undefined;
          }
          return pomodoroState;
        });
      }, 1000);
      return pomodoro;
    }
    return pomodoro;
  });
};

const pausePomodoro = () => {
  update((state) => {
    state.status = "PAUSED";
    clearInterval(state.interval);
    state.interval = undefined;
    return state;
  })
};

const completePomodoro = () => {
  update((state) => {
    state.status = "COMPLETED";
    clearInterval(state.interval);
    state.interval = undefined;
    return state;
  })
};

export {subscribe, setPomodoro, startPomodoro, pausePomodoro, completePomodoro};

