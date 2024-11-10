<template>
  <div class="video-player-dialog">
    <el-dialog v-model="visible" :close-on-click-modal="true" width="80%">
      <div class="video-wrapper">
        <video
          ref="video"
          controls
          autoplay
          :src="videoUrl"
          class="video-element"
        ></video>
        <el-button class="close-btn" @click="onClose">
          <el-icon><CloseBold /></el-icon>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup name="VideoPlayerDialog">
import { ref, watch } from 'vue';
import { ElDialog, ElButton } from 'element-plus';

// 视频 URL 作为 props 传入
defineProps({
  videoUrl: {
    type: String,
    required: true,
  },
});
const visible = defineModel(false);

const onClose = () => {
  visible.value = false;
};

// 控制视频播放状态
const video = ref(null);
watch(
  () => visible,
  (newValue) => {
    if (newValue && video.value) {
      video.value.play();
    } else if (video.value) {
      video.value.pause();
    }
  },
);
</script>

<style scoped lang="scss">
:deep(.el-dialog) {
  --el-dialog-padding-primary: 0 !important;
}

.video-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-element {
  width: 100%;
  height: auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0;
  transition: opacity 0.3s ease; /* 添加淡入淡出效果 */
  background: transparent;
  border: none;
}

.video-wrapper:hover .close-btn {
  opacity: 1; /* 鼠标悬停时显示按钮 */
}
</style>
