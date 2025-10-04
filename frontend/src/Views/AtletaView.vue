<script setup lang="ts">
import { ApiService } from '@/ExternalServices/ApiServices';
import type { Atleta } from '@/Types/Atleta';
import { defineProps, onMounted, ref } from 'vue';

const atleta = ref<Atleta>();
const ErrorMessage = ref<string>();

const props = defineProps({
    IdAtleta: {
        type: Number,
        required: true,
    }
}
);

const SearchAtleta = async () => {
    const Id = props.IdAtleta
    const result = await ApiService.findOneAtleta(Id);

    if (!result.isSuccess) {
        ErrorMessage.value = result.error.message
    } else {
        atleta.value = result.value
    }
}

onMounted(() => {
    SearchAtleta
});


</script>