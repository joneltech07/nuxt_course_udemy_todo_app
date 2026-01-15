<template>
	<div>
		<h1>All Todos:</h1>
		<TodoList :todos="todos" />
	</div>
</template>

<script setup lang="ts">
	const todoStore = useTodoStore();
	const { todos } = storeToRefs(todoStore);

</script>

<style lang="css">
	
</style>