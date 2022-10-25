<template lang="pug">
Vue3Marquee(v-if="hasAnnouncement" :duration="30")
  .inline-block(
    v-for="(announcement, index) in announcements"
    :key="announcement"
  )
    .flex.mr-4
      svg-icon.fill-primary.stroke-primary.mx-1(
        name="announcement"
        :width="24"
        :height="24"
      )
      .cursor-pointer(@click="$router.push({name: RouterNames.information})") {{announcement}}
div.marquee-placeholder(v-else)
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch
} from "vue";
import Vue3Marquee from "vue3-marquee";
import { getStore, TStore } from "~/store";
import RouterNames from "~/router/name";

interface IState {
  isLoading: boolean;
  announcements: string[];
}

export default defineComponent({
  name: "Marquee",
  components: {
    Vue3Marquee
  },
  setup() {
    const { global } = getStore() as TStore;
    const state = reactive<IState>({
      isLoading: false,
      announcements: global.state.announcements ?? []
    });
    const hasAnnouncement = computed<boolean>(() => {});
    const getAnnouncement = async (id?: number) => {
      state.isLoading = true;
      const announcementList = await BaseApi.getAnnouncement({ id: id });
      let announcements: string[] = [];
      if (announcementList.data.length > 0) {
        announcementList.data.forEach(item => {
          if (item.is_open) {
            announcements.push(item.title as string);
          }
        });
        state.announcements = announcements;
        global.actions.setGlobalStore({ announcements });
      }
      state.isLoading = false;
    };

    onMounted(() => {
      getAnnouncement();
    });

    watch(
      () => global.state.announcements,
      announcements => {
        state.announcements = announcements;
      }
    );

    return {
      ...toRefs(state),
      global,
      RouterNames
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep(.vue3-marquee) {
  z-index: 10;
}

::v-deep(.marquee) {
  @apply bg-appHeader py-1 text-text-light;
}

.marquee-placeholder {
  height: 32px;
  @apply fixed top-0 right-0 z-100 bg-appHeader;
  left: 230px;
}
</style>
