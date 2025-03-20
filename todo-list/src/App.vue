<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Card from './components/Card.vue';
import AddTask from './components/AddTask.vue';


import type { ComponentPublicInstance } from 'vue';

const cardRef = ref<ComponentPublicInstance<{ fetchTasks: () => void }> | null>(null);
let watingtime: number | null = null;

const loadTasks = () => {
  if (cardRef.value) {
    cardRef.value.fetchTasks();
  }
};

onMounted(() => {
  loadTasks();

  watingtime = setInterval(() => {
    loadTasks();
  }, 3000);    // Atualiza a lista de tarefas a cada 3 segundos
});
</script>

<template>
  <div class="bg-gradient-to-r from-slate-900 to-neutral-900 h-[1080px] w-full">
    <h1 class="font-semibold text-4xl text-white text-center pt-12">Todo-List</h1>
    
    <div class="flex justify-center itens-center">
      <div class="mt-8 flex gap-4">
        <AddTask />
      </div>
    </div>

    <div class="flex justify-center itens-center">
      <Card ref="cardRef" class="mt-24 rounded-sm" />
    </div>
  </div>
  <footer class="bg-gradient-to-r from-slate-900 to-neutral-900 pb-[10px]">
    <h1 class="text-white text-center text-[20px]">Desenvolvido por 
      <a class="font-bold text-indigo-500" href="https://www.mateuslima.dev" target="_blank">mateuslima.dev</a>
    </h1>
  </footer>
</template>
