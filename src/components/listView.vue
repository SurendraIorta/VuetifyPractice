<template>
    <v-container>
        <v-card raised>
            <v-card-title style="text-align:center;" >Lead List View</v-card-title>
            <v-btn  color="secondary"  elevation="2"  medium @click="goToNewLead">Create New Lead</v-btn>
            <v-btn  color="secondary"  elevation="4"  medium @click="goToTableView">Lead Table View</v-btn>
        </v-card>
         <v-list flat>
             <v-list-item-group v-model="selectedItem"  color="primary"> 
                 <v-list-item v-for="(item, i) in leadList"  :key="i">
                     <v-list-item-content>
                         <v-list-item-title v-text="item.id"></v-list-item-title>
                         <v-list-item-title v-text="item.first_name"></v-list-item-title>
                         <v-list-item-title v-text="item.last_name"></v-list-item-title>
                         <v-list-item-title v-text="item.email"></v-list-item-title>
                     </v-list-item-content>
                 </v-list-item>
             </v-list-item-group>
         </v-list>    
    </v-container>    
</template>

<script>

var axios       =   require('axios');
// import allUrl from './../constants/allurls';
import commonFunctions from './../constants/commonFunctions';
export default {
    data(){
        return {
            leadList : [],
            selectedItem    :   0
        }
    },
    methods:{
        goToNewLead(){
            this.$router.push('/formfield')
        },
        goToTableView(){
             this.$router.push('/tableview');
        }
    },
    mounted(){
         if(!commonFunctions.isNetworkConnected){
            this.agentSelectorDisabled   =   true;
            alert("You are not connected to internet.","Internet Issue")
         }else{
             axios.get("https://reqres.in/api/users?page=1")
            .then((res)=>{
                console.log(res);
                this.leadList    =  res.data.data;
            }).catch((err)=>{
                console.log(err);
                alert(err);
            })
         }
    }
}
</script>

<style scoped>

</style>