<template>
    <h1>Update Device</h1>
    <div class="container mb-3">
        <form action="">
            <div class="mb-3">
                <label for="" class="form-label">
                    Device Name
                </label>
                <input type="text" class="form-control" v-model="name" disabled>

            </div>
            <div class="mb-3">
                <label for="" class="form-label">Serial Number</label>
                <input type="text" class="form-control" v-model="serialNo" disabled>
            </div>

            <div class="mb-3">
                <label for="" class="form-label">Location</label>
                <input type="text" class="form-control" v-model="location">
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    Device Type
                </label>

                <select id="deviceTypeList" class="form-select form-control dropdown-toggle" disabled v-model="deviceType">
                    <option value="seismic">seismic</option>
                    <option value="energy">energy</option>
                    <option value="waterflow">waterflow</option>
                </select>


            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    Device Status
                </label>
                <select name="" id="deviceStatusList" class="form-select form-control" v-model="status">
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                    <option value="decommissioned">decommissioned</option>
                </select>
                <!-- v-model ==> 2 way binding, will update one another -->
            </div>

            <div class="mb-3">
                <button class="btn btn-primary" :disabled="isFormInvalid" @click.prevent="updateDevice()">
                    Update Device
                </button>
            </div>

        </form>
    </div>
</template>

<script>
//import router from '@/router';
import axios from 'axios';
import router from '../router/index'

export default {
    props: ['id'],
    data() {
        return {
            name: "",
            serialNo: "",
            location: "",
            deviceType: "",
            status: ""
        }
    },
    created() {
        axios.get('http://localhost:3000/' + this.id).then(res => {
            console.log(res.data);

            this.name = res.data.name;
            this.serialNo = res.data.serialNo;
            this.location = res.data.location;
            this.deviceType = res.data.deviceType;
            this.status = res.data.status;
        })
    },
    methods: {
        updateDevice() {
            axios.post("http://localhost:3000/edit/" + this.id, {
                location: this.location,
                status: this.status
            }).then(data => {
                alert("Updated successfully!")
                router.push('/');
            }).catch(error => {
                alert('Error!')
            });
        },
    }
}
</script>

<!-- <script setup>
import axios from 'axios';
import { ref } from 'vue';

const id = defineProps({
    id: String
});

axios.get('http://localhost:3000/' + id.id).then(res => {
    console.log(res.data);

    let name = ref(res.data.name);
    let serialNo = ref('');
    let location = ref('');
    let deviceType = ref('');
    let status = ref('');
})


</script> -->