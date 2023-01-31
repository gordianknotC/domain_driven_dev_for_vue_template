<template lang="pug">
//- this is comment
Vue3Marquee( :duration="30")
  .inline-block(
    v-for="(announcement, index) in state.announcements"
    :key="index"
  )
    .container
      svg-icon(
        name="Campaign"
        size="20px"
      )
      .text-label.cursor-pointer(@click="onGoToAnnouncementPage") {{announcement.title}}

</template>

<script lang="ts">
export default {
  name: "Marquee"
};
</script>
<script lang="ts" setup>
import "vue3-marquee/dist/style.css";
import { Vue3Marquee } from "vue3-marquee";
import { computed, onMounted, reactive } from "vue";
import type { AnnouncementEntity } from "~/data_source/entities/announcement_entity";
import { RequestEvent } from "~/data_source/entities/request_entity";
import { facade } from "~/main";
import { ERouteName } from "../const/router_const";

const state = reactive({
  isLoading: false,
  announcements: computed(() => {
    return facade.stores.appMenu.state.announcements.entity;
  })
});

const hasAnnouncement = computed<boolean>(() => {
  console.log(
    "hasAnnouncement:",
    facade.stores.appMenu.state.announcements.entity.length > 0,
    "announcements",
    state.announcements
  );
  return facade.stores.appMenu.state.announcements.entity.length > 0;
});

const updateAnnouncement = async (id: number) => {
  state.isLoading = true;
  await facade.data.repo.announcement.fetchAndUpdate(
    { id },
    RequestEvent.getAnnouncement
  );
  state.isLoading = false;
};

const onGoToAnnouncementPage = (ann: AnnouncementEntity) => {
  console.log("goto announcement", ann);
};

onMounted(async () => {
  //await updateAnnouncement();
});
</script>

<style lang="scss" scoped>
::v-deep(.vue3-marquee) {
  z-index: 10;
}

::v-deep(.marquee) {
  @apply bg-appHeader py-1 text-text-light;
}

.container {
  @apply mr-4 flex items-center text-sm;
  svg {
    @apply text-text-light;
  }
  .text-label {
    @apply pl-2 text-sm;
  }
}

.marquee-placeholder {
  height: 32px;
  @apply bg-appHeader;
  left: 230px;
}
</style>
