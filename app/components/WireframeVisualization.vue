<template>
  <div class="wireframe-container relative w-full aspect-square">
    <svg
      viewBox="0 0 400 400"
      class="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Background Grid -->
      <defs>
        <!-- Glow filter -->
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Horizontal Lines -->
      <line
        v-for="y in 8"
        :key="`h-${y}`"
        :x1="0"
        :y1="y * 50"
        :x2="400"
        :y2="y * 50"
        stroke="#FF4D00"
        stroke-width="1"
        opacity="0.3"
        class="grid-line"
        :style="{ animationDelay: `${y * 0.1}s` }"
      />

      <!-- Vertical Lines -->
      <line
        v-for="x in 8"
        :key="`v-${x}`"
        :x1="x * 50"
        :y1="0"
        :x2="x * 50"
        :y2="400"
        stroke="#FF4D00"
        stroke-width="1"
        opacity="0.3"
        class="grid-line"
        :style="{ animationDelay: `${x * 0.1}s` }"
      />

      <!-- 3D Cube Wireframe -->
      <g class="cube" filter="url(#glow)">
        <!-- Back face -->
        <path
          d="M150,120 L250,120 L250,220 L150,220 Z"
          fill="none"
          stroke="#FF4D00"
          stroke-width="2"
          class="animate-pulse-slow"
        />
        <!-- Front face -->
        <path
          d="M120,150 L220,150 L220,250 L120,250 Z"
          fill="none"
          stroke="#FF4D00"
          stroke-width="2"
          class="animate-pulse-slow"
        />
        <!-- Connecting lines -->
        <line x1="150" y1="120" x2="120" y2="150" stroke="#FF4D00" stroke-width="2"/>
        <line x1="250" y1="120" x2="220" y2="150" stroke="#FF4D00" stroke-width="2"/>
        <line x1="250" y1="220" x2="220" y2="250" stroke="#FF4D00" stroke-width="2"/>
        <line x1="150" y1="220" x2="120" y2="250" stroke="#FF4D00" stroke-width="2"/>
      </g>

      <!-- Data Points -->
      <g class="data-points">
        <circle
          v-for="(point, i) in dataPoints"
          :key="`point-${i}`"
          :cx="point.x"
          :cy="point.y"
          :r="point.r"
          fill="#FF4D00"
          filter="url(#glow)"
          class="pulse-dot"
          :style="{ animationDelay: `${i * 0.2}s` }"
        />
      </g>

      <!-- Orbiting Circles -->
      <g class="orbit-container">
        <circle
          cx="200"
          cy="200"
          r="80"
          fill="none"
          stroke="#FF4D00"
          stroke-width="1"
          opacity="0.2"
          class="orbit-path"
        />
        <circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke="#FF4D00"
          stroke-width="1"
          opacity="0.2"
          class="orbit-path"
        />

        <!-- Orbiting dots -->
        <circle
          r="4"
          fill="#FF4D00"
          filter="url(#glow)"
          class="orbit-dot-1"
        >
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            path="M200,120 A80,80 0 1,1 199,120 Z"
          />
        </circle>

        <circle
          r="3"
          fill="#FF4D00"
          filter="url(#glow)"
          class="orbit-dot-2"
        >
          <animateMotion
            dur="12s"
            repeatCount="indefinite"
            path="M200,80 A120,120 0 1,0 199,80 Z"
          />
        </circle>
      </g>

      <!-- Central Node -->
      <circle
        cx="200"
        cy="200"
        r="8"
        fill="#FF4D00"
        filter="url(#glow)"
        class="pulse-dot"
      />

      <!-- Connection Lines (animated) -->
      <g class="connections" opacity="0.6">
        <line
          x1="200" y1="200"
          x2="280" y2="150"
          stroke="#FF4D00"
          stroke-width="1"
          class="connection-line"
          style="animation-delay: 0s"
        />
        <line
          x1="200" y1="200"
          x2="320" y2="280"
          stroke="#FF4D00"
          stroke-width="1"
          class="connection-line"
          style="animation-delay: 0.3s"
        />
        <line
          x1="200" y1="200"
          x2="100" y2="180"
          stroke="#FF4D00"
          stroke-width="1"
          class="connection-line"
          style="animation-delay: 0.6s"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
// Generate random data points for visualization
const dataPoints = [
  { x: 280, y: 150, r: 5 },
  { x: 320, y: 280, r: 4 },
  { x: 100, y: 180, r: 6 },
  { x: 340, y: 200, r: 4 },
  { x: 60, y: 250, r: 5 },
];
</script>

<style scoped>
/* Grid line fade animation */
.grid-line {
  animation: fadeLine 3s ease-in-out infinite;
}

@keyframes fadeLine {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.5; }
}

/* Pulse animation for dots */
.pulse-dot {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Slow pulse for cube */
.animate-pulse-slow {
  animation: pulseSlow 4s ease-in-out infinite;
}

@keyframes pulseSlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* Connection line draw animation */
.connection-line {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: drawLine 3s ease-in-out infinite;
}

@keyframes drawLine {
  0% { stroke-dashoffset: 200; opacity: 0; }
  50% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: -200; opacity: 0; }
}

/* Orbit path rotation */
.orbit-path {
  animation: rotate 20s linear infinite;
  transform-origin: center;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
