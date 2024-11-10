<script setup>
import ImagePreview from '@/components/ImageView.vue';
import { imageBase64 } from '@/store/imageBase64.js';
</script>

<template>
  <div class="img-preview">
    <div class="img-preview-container">
      <ImagePreview
        :imageData="imageBase64"
        :markers="[
          { x: 0, y: 0, width: 400, height: 500 },
          { x: 450, y: 80, width: 180, height: 180 },
        ]"
        :previewWidth="300"
      />
    </div>
  </div>
</template>

<style scoped>
.img-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
