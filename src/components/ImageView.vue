<template>
  <!-- 缩略图视图 -->
  <div @click="openPreview" class="thumbnail" :style="thumbnailStyle">
    <img :src="imageData" :style="thumbnailImageStyle" alt="Preview" />
    <div
      v-for="(marker, index) in markers"
      :key="index"
      class="marker"
      :style="getScaledMarkerStyle(marker, thumbnailScale)"
    ></div>
  </div>

  <!-- 放大预览视图 -->
  <div v-if="isPreviewOpen" class="preview-overlay" @click="closePreview">
    <div class="preview-container" :style="previewContainerStyle">
      <img
        :src="imageData"
        :style="previewImageStyle"
        ref="previewImage"
        alt="Preview"
      />
      <div
        v-for="(marker, index) in markers"
        :key="index"
        class="marker"
        :style="getScaledMarkerStyle(marker, previewScale)"
      ></div>
    </div>
  </div>
</template>

<script setup name="ImageView">
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  imageData: {
    type: String,
    required: true,
  },
  markers: {
    type: Array,
    required: true,
  },
  previewWidth: {
    type: Number,
    default: 300,
  },
  previewMaxWidth: {
    type: Number,
    default: 800, // 设置预览图最大宽度
  },
});

const isPreviewOpen = ref(false);
const originalWidth = ref(0);
const originalHeight = ref(0);

const openPreview = () => {
  isPreviewOpen.value = true;
};

const closePreview = () => {
  isPreviewOpen.value = false;
};

// 获取图片的原始宽高（像素值）
onMounted(() => {
  const img = new Image();
  img.src = props.imageData;
  img.onload = () => {
    originalWidth.value = img.width;
    originalHeight.value = img.height;
  };
});

// 缩略图和预览图的缩放比例基于原始像素宽度
const thumbnailScale = computed(() => props.previewWidth / originalWidth.value);
const previewScale = computed(() => {
  const previewWidth = Math.min(props.previewMaxWidth, window.innerWidth);
  return previewWidth / originalWidth.value;
});

// 计算缩略图和预览图的样式
const thumbnailStyle = computed(() => ({
  width: `${props.previewWidth}px`,
  height: `${props.previewWidth / (originalWidth.value / originalHeight.value)}px`,
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
}));

const thumbnailImageStyle = computed(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
}));

const previewContainerStyle = computed(() => ({
  width: `${Math.min(props.previewMaxWidth, window.innerWidth)}px`,
  height: 'auto',
  position: 'relative',
  margin: 'auto',
}));

const previewImageStyle = computed(() => ({
  width: '100%',
  height: 'auto',
  display: 'block',
}));

// 根据缩放比例计算标记框的样式
const getScaledMarkerStyle = (marker, scale) => {
  const calculatedScale = scale; // 直接传入数值
  return {
    position: 'absolute',
    border: '2px solid red',
    top: `${marker.y * calculatedScale}px`,
    left: `${marker.x * calculatedScale}px`,
    width: `${marker.width * calculatedScale}px`,
    height: `${marker.height * calculatedScale}px`,
  };
};
</script>

<style scoped>
.thumbnail {
  position: relative;
}

.preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 80%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
}

.preview-container {
  position: relative;
}

.marker {
  position: absolute;
  border: 2px solid red;
}
</style>
