<template>
	<ul>
		<li v-for="todo in todos" :key="todo.id">
			<NuxtLink :to="`/todos/${todo.id}`">{{ todo.title }}</NuxtLink>
			<span>{{ todo.isCompleted ? 'Completed' : 'Not Completed' }}</span>
		</li>
	</ul>
</template>

<script setup lang="ts">
	defineProps({
		todos: {
			type: Array as PropType<
				Array<{ id: number; title: string; isCompleted: boolean }>
			>,
		}
	})

</script>

<style scoped lang="css">
	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin-bottom: 10px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		background-color: #f9f9f9f9;
	}
</style>