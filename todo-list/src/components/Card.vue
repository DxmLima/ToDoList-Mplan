<script>
import axios from "axios";

export default {
  name: "Card",
  data() {
    return {
      tasks: [],
      isDescriptionOpen: false, 
      isEditOpen: false, 
      selectedTask: null, 
      editedTitle: "", 
      editedDescription: "", 
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        this.tasks = response.data; 
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    },

    async toggleTaskCompletion(task) {
      try {
        const updatedTask = { ...task, completed: !task.completed }; 

        await axios.put(`http://localhost:3000/task/${task.id}`, {
          completed: updatedTask.completed,
        });

        
        this.tasks = this.tasks.map((t) => (t.id === task.id ? updatedTask : t));
      } catch (error) {
        console.error("Erro ao atualizar status da tarefa:", error);
      }
    },

    async deleteTasks(id) {
      try {
        await axios.delete(`http://localhost:3000/task/${id}`);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
      }
    },

    openDescription(task) {
      this.selectedTask = task;
      this.isDescriptionOpen = true;
    },

    openEdit(task) {
      this.selectedTask = task;
      this.editedTitle = task.title;
      this.editedDescription = task.description;
      this.isEditOpen = true;
    },

    closeModals() {
      this.isDescriptionOpen = false;
      this.isEditOpen = false;
    },

    async updateTasks() {
      try {
        await axios.put(`http://localhost:3000/task/${this.selectedTask.id}`, {
          title: this.editedTitle,
          description: this.editedDescription,
        });

        this.selectedTask.title = this.editedTitle;
        this.selectedTask.description = this.editedDescription;
        this.isEditOpen = false;
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
    },
  },

  mounted() {
    this.fetchTasks();
  },
};
</script>

<template>
  <div class="bg-white h-auto w-[550px] mt-12">
    <AddTask />
    <div class="m-10 gap-4">
      <ul>
        <li
          v-for="task in tasks"
          :key="task.id"
          :class="[
            'mt-2 px-2 py-2 rounded-sm text-[18px] tracking-wider font-bold transition',
            task.completed ? 'bg-green-300' : 'bg-blue-100',
          ]"
        >
          <div class="flex items-center">
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleTaskCompletion(task)"
              class="mr-2"
            />
            <h1 class="ml-2">{{ task.title }}</h1>
          </div>

          <div class="mt-2 flex gap-2">
            <button
              @click="deleteTasks(task.id)"
              class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>

            <button
              @click="openDescription(task)"
              class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 transition"
            >
              Descrição
            </button>

            <button
              @click="openEdit(task)"
              class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
            >
              Editar
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>

 
  <teleport to="body">
    <div
      v-if="isDescriptionOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-5 rounded shadow-lg">
        <h2 class="text-lg font-bold mb-4">{{ selectedTask?.title }}</h2>
        <p class="m-8 text-[20px] w-[500px] break-words">
          {{ selectedTask?.description }}
        </p>
        <button @click="closeModals" class="bg-red-500 text-white px-4 py-2 rounded">
          Fechar
        </button>
      </div>
    </div>
  </teleport>


  <teleport to="body">
    <div
      v-if="isEditOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-5 rounded shadow-lg w-[400px]">
        <h2 class="text-lg font-bold mb-4">Editar Tarefa</h2>
        <div class="flex flex-col gap-2">
          <label class="font-medium">Título</label>
          <input v-model="editedTitle" class="border px-2 py-1 rounded" type="text" />

          <label class="font-medium mt-2">Descrição</label>
          <textarea v-model="editedDescription" class="border px-2 py-1 rounded"></textarea>
        </div>
        <div class="flex gap-4 mt-4">
          <button @click="updateTasks" class="bg-green-500 text-white px-4 py-2 rounded">
            Salvar
          </button>
          <button @click="closeModals" class="bg-red-500 text-white px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
