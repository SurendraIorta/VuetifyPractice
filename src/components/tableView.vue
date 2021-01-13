<template>
    <v-container>
    <v-card raised>
        <v-card-title style="text-align:center;" >Lead List View</v-card-title>
        <v-btn  color="secondary"  elevation="2"  medium @click="goToNewLead">Create New Lead</v-btn>
        <v-btn  color="secondary"  elevation="4"  medium @click="goToListView">Lead List View</v-btn>
    </v-card>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Id
          </th>
          <th class="text-left">
            First Name
          </th>
          <th class="text-left">
            Last Name
          </th>
          <th class="text-left">
            Email
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in leadList"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.email }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </v-container>
</template>

<script>
import axios from 'axios';
import commonFunctions from '../constants/commonFunctions';
export default {
    data(){
        return {
            leadList : []
        }
    },
    methods:{
        goToNewLead(){
            this.$router.push('/formfield')
        },
        goToListView(){
            this.$router.push('/');
        },
    },
    created(){
        this.$store.commit("UPDATE_VIEW","TableView");
        if(commonFunctions.isNetworkConnected){
            axios.get("https://reqres.in/api/users?page=2")
            .then((res)=>{
                console.log(res);
                this.leadList   =   res.data.data;
            })
            .catch((err)=>{
                console.log(err);
                alert(err);
            })
        }
    }
}
</script>

<style scoped>

</style>