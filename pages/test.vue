<template>
  <div>
    <div class="outer-div">
      <div class="inner-div">
        <!-- 内部内容 -->
        <p>这是一个内部 div，宽度为 500px，可以在外部 div 中左右滑动。</p>
        <p>更多内容...</p>
        <p>继续滑动...</p>
      </div>
    </div>
  </div>
</template>
<style>
.outer-div {
  width: 300px;
  height: 200px; /* 你可以根据需要调整高度 */
  overflow-x: auto; /* 允许水平滚动 */
  overflow-y: hidden; /* 禁止垂直滚动 */
  border: 1px solid #000; /* 边框，仅用于演示 */
  position: relative; /* 确保内部 div 的定位正确 */
}

.inner-div {
  width: 1500px;
  height: 100%; /* 与外部 div 高度一致 */
  background-color: #f0f0f0; /* 背景色，仅用于演示 */
  padding: 10px; /* 内边距，仅用于演示 */
  box-sizing: border-box; /* 确保内边距和边框不影响宽度计算 */
}
</style>
