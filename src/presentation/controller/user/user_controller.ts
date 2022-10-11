import { defineStore } from "pinia";
import { ref } from "vue";
import { useMediaControls } from "@vueuse/core";

export const userController = defineStore("user", () => {
  // we won't expose this element directly
  const videoElement = ref<HTMLVideoElement>();
  const src = ref<any>("/data/video.mp4");
  const { playing, volume, currentTime, togglePictureInPicture } =
    useMediaControls(videoElement, { src });

  function loadVideo(element: HTMLVideoElement, url: string) {
    videoElement.value = element;
    src.value = url;
  }

  return {
    src,
    playing,
    volume,
    currentTime,
    loadVideo,
    togglePictureInPicture
  };
});
