<template>
    <div class="flex gap-3">
      
      <input class="bg-white rounded-sm px-2 py-2" v-model="taskTitle" placeholder="Digite a Task" />
      <textarea class="bg-white rounded-sm px-2 py-2" v-model="taskDescription" placeholder="Descrição da Task"></textarea>
      
      <button class="ml-4 px-2 py-2 font-semibold bg-indigo-500 hover:bg-indigo-800 text-white tracking-wider rounded-sm" @click="createTask">Adicionar Tarefa</button>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        taskTitle: "",
        taskDescription: "",
        
      };
    },
    methods: {
      async createTask() {
        if (!this.taskTitle) {
          alert("É Obrigatorio Adicionar uma Task !");
          return;
        } 

        if (!this.taskDescription) {
          alert('É Obrigatório Adicionar Descriçao');
          return;
        }
  
        try {
          const response = await axios.post("http://localhost:3000/tasks", {
            title: this.taskTitle,
            description: this.taskDescription,
          });
  
          alert(`Task Criada ✔: ${response.data.title}`);
          this.taskTitle = ""; 
        } catch (error) {
          console.error("Erro ao criar a tarefa:", error);
          alert("Erro na requisição.");
        }
      },
    },
  };
  </script>