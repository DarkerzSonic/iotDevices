<template>
    <h1>Create New Device</h1>
    <div class="container mb-3">
        <form action="">
            <div class="mb-3">
                <label for="" class="form-label">
                    Device Name
                </label>
                <input type="text" class="form-control" v-model="name">

            </div>
            <div class="mb-3">
                <label for="" class="form-label">Serial Number</label>
                <input type="text" class="form-control" v-model="serialNo">
            </div>

            <div class="mb-3">
                <label for="" class="form-label">Location</label>
                <input type="text" class="form-control" v-model="location">
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    Device Type
                </label>

                <select id="deviceTypeList" class="form-select form-control dropdown-toggle" v-model="deviceType">
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
                <button class="btn btn-primary" :disabled="isFormInvalid" @click.prevent="createDevice()">
                    Create Device
                </button>
            </div>

        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import router from '../router/index'

let name = ref('');
let serialNo = ref('');
let location = ref('');
let deviceType = ref('');
let status = ref('');

function createDevice() {
    
    axios.post("http://localhost:3000/create", {
        name: this.name,
        serialNo: this.serialNo,
        location: this.location,
        deviceType: this.deviceType,
        status: this.status
    }).then(data => {
        alert('New device added successfully!')
        router.push('/');
        //this.devices.push(data.data);
    }).catch(error => {
        alert('Error!')
    })
}

const isFormInvalid = computed(() => {
    return !name.value || !serialNo.value || !location.value || !deviceType.value || !status.value;
});
</script>
