<template>
	<TodoForm :todo="todo" :isEdit="isEdit" />
</template>

<script setup lang="ts">
const route = useRoute();
const isEdit = computed(() => route.params.action === 'edit');

const todo = ref({
	id: 0,
	title: '',
	description: '',
	isCompleted: false,
	createdAt: new Date().toISOString(),
})

onMounted(() => {
	const todoStore = useTodoStore();
	const { getTodoById } = storeToRefs(todoStore);

	if (isEdit.value) {
		const todoId  = Number(route.params.type);
		const existingTodo = getTodoById.value(todoId);
		if (existingTodo) {
			todo.value = { ...existingTodo };
		}
	}
});
</script>

<style lang="css">
	
</style>