<template>
    <div class="inpage_container">
        <v-card raised>
            <v-card-title style="text-align:center;" >Create New Lead </v-card-title>
            <v-btn  color="secondary"  elevation="2"  medium @click="goToListView">Lead List View</v-btn>
            <v-btn  color="secondary"  elevation="4"  medium @click="goToTableView">Lead Table View</v-btn>
        </v-card>
        <v-form ref="form" v-model="valid" >
            <v-select
                v-model="isReferenceLead"
                :items="allListOptions.yesNoOptions"
                :rules="[v => !!v || 'Please select if this is reference lead or not']"
                label="Is Reference Lead"
                required
                class="whiteback"
                @change="checkRefValue"
            ></v-select>

            <v-text-field
                v-model="referenceMobile"
                :counter="10"
                :rules="allListOptions.mobileRules"
                :type="mobile"
                label="Reference Mobile Number"
                required
                class="whiteback"
                v-if="isReferenceLead == 'Yes'"
               @change="updateReferenceName"
            ></v-text-field>

            <v-text-field
                v-model="referenceName"
                :disabled="true"
                :rules="allListOptions.nameRules"
                label="Reference Name"
                required
                class="whiteback"
                v-if="isReferenceLead == 'Yes'"
            ></v-text-field>

            <v-text-field
                v-model="firstName"
                :rules="allListOptions.nameRules"
                label="First Name"
                required
                class="whiteback"
            ></v-text-field>

            <v-text-field
                v-model="middleName"
                :rules="allListOptions.nameRules"
                label="Middle Name"
                required
                class="whiteback"
            ></v-text-field>

            <v-text-field
                v-model="lastName"
                :rules="allListOptions.nameRules"
                label="Last Name"
                required
                class="whiteback"
            ></v-text-field>

            <v-text-field
                v-model="mobile"
                :counter="10"
                :rules="allListOptions.mobileRules"
                :type="mobile"
                label="Mobile Number"
                required
                class="whiteback"
            ></v-text-field>

            <v-text-field
                v-model="email"
                :rules="allListOptions.emailRules"
                label="E-mail"
                required
                class="whiteback"
            ></v-text-field>

            <v-radio-group v-model="gender" row  class="radioback" id="radiogrp">
                <v-radio v-for="opt in allListOptions.genderOptions" :key="opt" :label="`${opt}`" :value="opt" ></v-radio>
             </v-radio-group>

            <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                
                >
                <template v-slot:activator="{ on }">
                    <v-text-field
                    v-model="dateFormatted"
                    label="Date of Birth"
                    hint="MM/DD/YYYY"
                    persistent-hint
                    @blur="date = parseDate(dateFormatted)"                    
                    v-on="on"
                    class="whiteback"
                    @change="updateAge($event)"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="menu1 = false" @change="updateAge($event)"></v-date-picker>
            </v-menu>

            <v-text-field
                v-model="age"
                :counter="2"
                :rules="allListOptions.ageRules"
                type="number"
                :disabled="true"
                label="Age"
                required
                class="whiteback"
            ></v-text-field>

            <v-select
                v-model="leadType"
                :items="allListOptions.leadTypeOptions"
                :rules="[v => !!v || 'Please select if this is reference lead or not']"
                label="Lead Type"
                required
                class="whiteback"
            ></v-select>
            
            <v-select
                v-model="campaign"
                :items="allListOptions.campaignOptions"
                :rules="[v => !!v || 'Campaign is required']"
                label="Campaign"
                required
                class="whiteback"
            ></v-select>

            <v-select
                v-model="allocatedAgent"
                :items="agentList"
                :item-text="agentDetailText"
                item-value="AgentID"
                :rules="[v => !!v || 'Agent selection is required']"
                label="Allocated To"
                required
                class="whiteback"
                :disabled="agentSelectorDisabled"
            ></v-select>

            <div class="btn_container">
                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4 centerbtn"
                    @click="createNewLead"
                >   Submit
                </v-btn>

                <v-btn
                    color="error"
                    class="mr-4 centerbtn"
                    @click="reset"
                >   Reset Form
                </v-btn>

                <v-btn
                    color="warning"
                    class="centerbtn"
                    @click="resetValidation"
                >   Reset Validation
                </v-btn>
            </div>
           
        </v-form>
    </div>
</template>

<script>
var axios       =   require('axios');
import allUrl from './../constants/allurls';
import commonFunctions from './../constants/commonFunctions';
import allListOptions  from './../constants/listOptions';
export default {
    data(){
        return {
            
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            menu2: false,

            agentSelectorDisabled:  false,

            loggedInAgent:"A309090",
            isReferenceLead:'',
            referenceMobile:'',
            referenceName:'',
            referenceLeadID:'',
            firstName: '',
            middleName: '',
            lastName: '',
            date_of_birth: '',
            email: '',
            mobile: '',
            age:'0',
            gender:'',
            campaign:'',
            leadType:'',
            allocatedAgent:'',
            agentList:[],

            valid: true,
            allListOptions:allListOptions,
            row:null


       }
    }, 
    methods: {
      goToListView(){
            this.$router.push('/');
        },
        goToTableView(){
            this.$router.push('/tableview');
        },  
      updateReferenceName(){
          console.log("Store Obj - ",this.$store);
          this.referenceName    =   "Updated"
      },  
      createNewLead () {
        if(this.$refs.form.validate()){
            let newLeadData     =   {
                    "LeadType"        :   this.leadType,
                    "Campaign"        :   this.campaign,
                    "AllocatedTo"     :   this.allocatedAgent,
                    "AllocatedBy"     :   this.loggedInAgent,
                    "IsReferenceLead" :   this.isReferenceLead == "Yes" ? true : false ,
                    "RefferedBy"      :   this.referenceLeadID,
                    "FirstName"       :   this.firstName,
                    "LastName"        :   this.lastName,
                    "MiddleName"      :   this.middleName,
                    "ContactNumber"   :   this.mobile,
                    "Gender"          :   this.gender,
                    "DateOfBirth"     :   this.date_of_birth ? this.date_of_birth : this.dateFormatted
            };

            console.log(newLeadData);

            axios.post(allUrl.getURL("createNewLead"),newLeadData)
            .then((res)=>{
                console.log(res);
                alert("New Lead created with Id - "+res.data.id)
            }).catch((err)=>{
                console.log(err);
                alert(err);
            })
        }
      },
      checkRefValue() {
          if(this.isReferenceLead == "No"){
              this.referenceLeadID      =   '';
              this.referenceMobile      =   '';
              this.referenceName        =   '';
          }
      },
      changeGender(){
          console.log("$event = ",this.$event,"gender = ",this.gender);
      },
      agentDetailText(item){
          return item.first_name + " "+ item.last_name + " ("+ item.id +")";
      },  
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      updateAge(event){
          this.age  =   this.calculateAge(event)
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    created(){
        console.log(allListOptions);
        this.$store.commit("UPDATE_VIEW","AddNewLeadView");
        if(!navigator.onLine && commonFunctions.isNetworkConnected){
            this.agentSelectorDisabled   =   true;
            alert("You are not connected to internet.","Internet Issue")
        }else{
            axios.get(allUrl.getURL("getReportingAgentList")+'/'+this.loggedInAgent)
            .then((res)=>{
                console.log(res);
                this.agentSelectorDisabled   =   false;
                if(Array.isArray(res.data.data) && res.data.data.length > 0){
                    console.log("Agent list found");
                    this.agentList               =   res.data.data;
                }
                // else if(res.data && res.data.data && res.data.data){
                //         this.agentList  = [res.data.data];
                // }
                else{
                    this.agentList  = [];
                    this.agentSelectorDisabled   =   true;
                }
            }).catch((err)=>{
                console.log(err.message);
                alert(err);
            });
        }
    }
}
</script>

<style scoped>
.inpage_container {
    /* background: #F9FE70; */
    margin-top: 50px;
    height: 500px;
}

.whiteback {
    display: inline-flex;
    margin :  10px;
    margin-top :  30px;
    width: 30%;
    background: #FFFFFF;
    text-align: center;
    vertical-align: middle;
    box-shadow: #000000 5px 5px 3px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: pointer;
}

.radioback {
    display: inline-flex;
    margin :  10px;
    margin-top :  30px;
    width: 30%;
    background: #FFFFFF;
    color: #FFFFFF;
    text-align: center;
    vertical-align: middle;
    box-shadow: #000000 5px 5px 3px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: pointer;
}

.btn_container {
    margin: 20px;
    align-items: center;
    justify-items: center;
    
}

.centerbtn {
    align-items: center;
    justify-items: center;
}

</style>

