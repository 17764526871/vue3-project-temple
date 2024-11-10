<template>
  <div>
    <el-button type="primary" @click="showVideo">播放视频</el-button>
    <VideoPlayer
      :videoUrl="videoUrl"
      v-model="isVideoVisible"
      v-if="isVideoVisible"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import videoFile from '@/assets/video.mp4';
import VideoPlayer from '@/components/VideoPlayerDialog.vue';

const videoUrl = videoFile; // 视频URL
const isVideoVisible = ref(false);

const showVideo = () => {
  console.log('播放视频');
  isVideoVisible.value = true;
};
</script>
