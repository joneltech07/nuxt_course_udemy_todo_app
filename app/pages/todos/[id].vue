<template>
	<div>
		<h1>{{ todo?.title }}</h1>
		<p>{{ todo?.description }}</p>

		<hr class="my-s">

		<p>Completed : {{ todo?.isCompleted ? 'Yes' : 'No' }}</p>
		<p>Created at: {{ todo?.createdAt }}</p>

		<NuxtLink class="btn" :to="`/todos/edit/${todo?.id}`">Edit</NuxtLink>

		<button @click="todoStore.updateMarkCompletedStatus(todoId)"
			:class="todo?.isCompleted ? 'btn-danger' : 'btn-success'">
			Mark As {{ todo?.isCompleted ? 'Not Completed' : 'Completed' }}
		</button>

	</div>
</template>

<script setup lang="ts">
definePageMeta({
	pageTransition: {
		name: 'rotate'
	}
})

useSeoMeta({
	title: 'Nuxt - Todo Details',
	description: 'Nuxt Todo App - Details Page'
});

const route = useRoute();

const todoStore = useTodoStore();
const { todos, getTodoById } = storeToRefs(todoStore);

const todoId = Number(route?.params.id);

const todo = computed(() => {
	return getTodoById.value(todoId);
});

</script>

<style lang="css">
.btn {
	background-color: #007bff;
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	border-radius: 4px;
	text-decoration: none;
	margin: 10px;
	font-size: 16px;
}

.btn:hover {
	background-color: #0056b3;
	color: white;
}

.btn-success {
	background-color: #28a745;
	color: white;
	border: none;
	padding: 10px 20px;
	cursor: pointer;
	border-radius: 4px;
	text-decoration: none;
	margin: 10px;
	font-size: 16px;
}

.btn-success:hover {
	background-color: #218838;
}

.btn-danger {
	background-color: #dc3545;
	color: white;
	border: none;
	padding: 10px 20px;
	cursor: pointer;
	border-radius: 4px;
	text-decoration: none;
	margin: 10px;
	font-size: 16px;
}

.btn-danger:hover {
	background-color: #c82333;
}
</style>