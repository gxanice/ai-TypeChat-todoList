<template>
    <div>
        <input v-model="message" type="text" />
        <button @click="handleSend">send</button>
        <button @click="handleSpeech">🔊</button>
        <div>
            <ul>
                <li v-for="todo in todoS">{{ todo.title }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { todoS, addTodo, removeTodo, changeTodoTitle } from "./todo";
import axios from 'axios'

// interface TodoSchema {
//     operation: "add" | "remove" | "change";
//     todo: {
//         id: string;
//         title: string;
//         content: string;
//     };
// }

const message = ref("");

async function handleSend() {
    const { data } = await axios.post("/api/chat", {
        message: message.value,
        todoS: JSON.stringify(todoS.value),
    });

    console.log(data);
    // mock backend data
    //   const data: TodoSchema = {
    //     operation: "remove",
    //     todo: {
    //       id: "1",
    //       title: "明天和小明去吃饭",
    //       content: "",
    //     },
    //   };

    const { operation, todo } = data;

    switch (operation) {
        case "add":
            addTodo(todo.title);
            break;
        case "remove":
            removeTodo(todo.id);
            break;
        case "change":
            changeTodoTitle(todo.id, todo.title);
            break;
        default:
            break;
    }
}

function handleSpeech() {
    console.log("speech");
}
</script>

<style scoped></style>
