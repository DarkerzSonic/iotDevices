<template>
  <div class="container">
    <h1>Devices</h1>
    <div class="text-end"><h5>Number of Devices: {{ devices.length }}</h5></div>
    <div class="row">
      <div class="card col-lg-3 col-md-6" v-for="(device, i) in devices" :key="device._id">
        <h3 class="card-header">
          {{ device.name }}
        </h3>
        <div class="card-body">
          <p class="card-title">Serial No: {{ device.serialNo }}</p>
          <p class="card-text">Location: {{ device.location }}</p>
          <p class="card-text">Type: {{ device.deviceType }}</p>
          <p class="card-text">Status: {{ device.status }}</p>
          <router-link :to="{name: 'DeviceDetails', params: {id: device._id}}">
            <a class="btn btn-primary">Update</a>
          </router-link>
          
          <a class="btn btn-danger" @click.prevent="removeDevice(device._id, i)">Delete</a>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
      devices: []
    }
  },
  async mounted() {
    axios.get("http://localhost:3000/posts").then(data => {
      //console.log(data.data);
      this.devices = data.data;
    }).catch(error => {
      console.log(error);
    });
  },
  methods: {
    removeDevice(deviceId, i) {
      axios.delete("http://localhost:3000/" + deviceId).then(data => {
        //console.log(data);
        alert("Device deleted successfully!");
        this.devices.splice(i, 1);
      }).catch(error => {
        console.log(error);
      });
    },
    
  },


}
</script>

<style scoped>
.card {
  padding: 0;
}
</style>
