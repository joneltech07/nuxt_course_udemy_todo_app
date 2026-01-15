<template>
	<div>
		<Banner />
		
		<br>

		<TodoList :todos="recentTodos" />

	</div>
</template>
<script setup lang="ts">
	const todoStore = useTodoStore();
	const {todos} = storeToRefs(todoStore);

	const recentTodos = computed(() => {
		return todos.value.slice(-3).reverse();
	});

</script>
<style lang="css">
	
</style>