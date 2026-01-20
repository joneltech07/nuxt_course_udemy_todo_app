<template>
	<form @submit.prevent="handleSubmit()">
		<div>
			<label for="title">Title</label>
			<input type="text" id="title" v-model="form.title" required>
		</div>

		<div>
			<label for="description">Desctiption</label>
			<textarea type="text" id="description" v-model="form.description" required />
		</div>

		<button type="submit" class="btn-success">{{ isEdit ? 'Update' : 'Add' }} Todo</button>
	</form>
</template>


<script setup lang="ts">
const router = useRouter();

const props = defineProps({
	todo: {
		type: Object as PropType<{
			id: number;
			title: string;
			description: string;
			isCompleted: boolean;
			createdAt: string;
		}>,
		default: () => ({
			id: 0,
			title: '',
			description: '',
			isCompleted: false,
			createdAt: new Date().toISOString(),
		}),
		require: true
	},
	isEdit: {
		type: Boolean as PropType<boolean>,
		default: false
	}
})

const form = ref({ ...props.todo });

const handleSubmit = async () => {
	const todoStore = useTodoStore();

	if (props.isEdit) {
		todoStore.updateTodo(form.value);
	} else {
		form.value.id = Date.now();
		await todoStore.addTodo(form.value);
	}

	router.push(`/todos`);
};

watch(() => props.todo, (newTodo) => {
	form.value = { ...newTodo };
});

</script>


<style lang="css">
form {
	background-color: white;
	padding: 10px;
	margin: 20px 0;
	border-radius: 5px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

div {
	margin-bottom: 10px;
}

label {
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
}

input,
textarea {
	width: 100%;
	padding: 5px;
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 3px;
}
</style>