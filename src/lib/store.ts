import {writable} from "svelte/store";
import {browser} from "$app/environment";

let defaultSettings: PomodoroSettings | undefined;
if (browser) {
  defaultSettings = JSON.parse(localStorage.getItem("settings")!);
}
if (!defaultSettings) {
  defaultSettings = {
    pomodoroDuration: 1500,
    shortBreakDuration: 300,
    longBreakDuration: 900,
  };
}

type PomodoroStatus = "IDLE" | "COMPLETED" | "PAUSED" | "RUNNING";
type PomodoroMode = "POMODORO" | "SHORT_BREAK" | "LONG_BREAK";
type PomodoroSettings = {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
};

export type PomodoroStore = {
  status: PomodoroStatus;
  mode: PomodoroMode;
  interval: NodeJS.Timer | undefined;
  time: number;
  settings: PomodoroSettings;
};

const {subscribe, update} = writable<PomodoroStore>({
  status: "IDLE",
  mode: "POMODORO",
  interval: undefined,
  time: defaultSettings.pomodoroDuration,
  settings: defaultSettings,
});

const resetPomodoroTime = () => {
  update((pomodoro) => {
    switch (pomodoro.mode) {
      case "POMODORO": pomodoro.time = pomodoro.settings.pomodoroDuration; break;
      case "SHORT_BREAK": pomodoro.time = pomodoro.settings.shortBreakDuration; break;
      case "LONG_BREAK": pomodoro.time = pomodoro.settings.longBreakDuration; break;
    }
    return pomodoro;
  });
};

const updatePomodoroStatus = (status: PomodoroStatus) => {
  update((pomodoro) => {
    pomodoro.status = status;
    return pomodoro;
  });
};

const updatePomodoroMode = (mode: PomodoroMode) => {
  update((pomodoro) => {
    pomodoro.mode = mode;
    return pomodoro;
  });
};

const startPomodoroInterval = () => {
  update((state) => {
    if (!state.interval) {
      state.interval = setInterval(() => {
        update((pomodoro) => {
          if (pomodoro.time > 0) {
            pomodoro.time = pomodoro.time - 1;
          } else {
            updatePomodoroStatus("COMPLETED");
            clearPomodoroInterval();
            resetPomodoroTime();
          }
          return pomodoro;
        });
      }, 1000);
    }
    return state;
  });
};

const clearPomodoroInterval = () => {
  update((pomodoro) => {
    clearInterval(pomodoro.interval);
    pomodoro.interval = undefined;
    return pomodoro;
  });
};

const start = () => {
  updatePomodoroStatus("RUNNING");
  startPomodoroInterval();
};

const pause = () => {
  updatePomodoroStatus("PAUSED");
  clearPomodoroInterval();
};


const changeMode = (mode: PomodoroMode) => {
  clearPomodoroInterval();
  updatePomodoroStatus("IDLE");
  updatePomodoroMode(mode);
  resetPomodoroTime();
};

const updateSettings = (settings: Partial<PomodoroSettings>) => {
  update((pomodoro) => {
    pomodoro.settings = {...pomodoro.settings, ...settings};
    localStorage.setItem("settings", JSON.stringify(pomodoro.settings));
    if (pomodoro.status === "IDLE") {
      resetPomodoroTime();
    }
    return pomodoro;
  });
};

export {subscribe, start, pause, changeMode, updateSettings};

