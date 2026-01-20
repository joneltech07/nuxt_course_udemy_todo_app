<template>
	<div>
		<h1>All Todos:</h1>
		<TodoList :todos="todos" />
	</div>
</template>

<script setup lang="ts">
const todoStore = useTodoStore();
const { todos } = storeToRefs(todoStore);

useHead({
	title: 'Nuxt - All Todos',
	meta: [
		{ name: 'description', content: 'All your todos here!' },
		{ name: 'keywords', content: 'todo, list, nuxt' }
	],

	script: [{
		innerHTML: 'console.log("All Todos Page")',
	}]
});

</script>

<style lang="css"></style>