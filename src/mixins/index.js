
export default {
    methods :   {
      calculateAge(dob){
        var dateString = dob;
        var today = new Date();
        var birthDate = new Date(dateString);
        if(today.getFullYear() <= birthDate.getFullYear() && today.getMonth() <= birthDate.getMonth() && today.getDate() <= birthDate.getDate() ){
            alert("Please Enter valid date");
            this.date_of_birth  =   new Date();
            this.dateFormatted  =   this.formatDate(new Date().toISOString().substr(0, 10));
            this.age            =   0;
        }else{
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
      }
    },
    mounted(){
        console.log("From Mixins");
    }
}