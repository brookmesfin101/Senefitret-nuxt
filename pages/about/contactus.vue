<template>
  <section class='pl-4 row'>
      <div class='col-9'>
          <header class='mt-3'>
            <h2>Contact Us</h2>
        </header>
        <div>
            <transition name="upload">
                <div v-show="showConfirmationComputed" class="alert alert-success pt-3 text-center w-50">                
                    <p class='lead mb-2'>Message successfully sent!</p>
                </div>
            </transition> 
        </div>         
        <div class='pt-2'>
            <h4 class='has-error' v-show='fieldsUnfilledComputed'>All fields must be filled.</h4>
            <div class="form-group row no-gutters">            
                <label for="from" class="col-lg-2 col-form-label"><strong>Name:</strong></label>
                <div class="col-lg-10">
                    <input type="text" v-model='from' class="form-control" id="from">
                </div>
            </div>
            <div class="form-group row no-gutters">
                <label for="from" class="col-lg-2 col-form-label"><strong>Email:</strong></label>
                <div class="col-lg-10">
                    <input type="text" v-model='email' class="form-control" id="from">
                </div>
            </div>
            <div class="form-group row no-gutters pt-2">
                <label for="emailBody" class='pb-2 col-lg-2'><strong>Message:</strong></label>
                <div class='col-lg-10'>
                    <textarea class="form-control " v-model='emailBody' id="emailBody" rows="5"></textarea>
                </div>
                
            </div>
            <div class="form-group">
                <button class='btn btn-lg btn-primary text-center' :disabled='disabledSubmitComputed' @click='submit'>Send</button>
            </div>
        </div>
      </div>
      
  </section>
</template>

<script>
const emailjs = require('@emailjs/browser');

export default {
    data(){
        return {
            email: '',
            from: '',            
            emailBody: '',
            fieldsUnfilled: false,
            showConfirmation: false,
            disabledSubmit: false
        }
    },
    computed:{
        fieldsUnfilledComputed(){
            return this.fieldsUnfilled;
        },
        showConfirmationComputed(){
            return this.showConfirmation;
        },
        disabledSubmitComputed(){
            return this.disabledSubmit;
        }
    },
    methods: {
        // validate contact fields
        validateFields(){
            if(!this.email || !this.from || !this.emailBody){                
                return false;
            } else {                
                return true;
            }
        },
        // setup email js template with parameter values
        setupEmailTemplate(){
            const templateParams = {
                to_name: 'Senefitret',
                from_name: this.from,
                email_id: this.email,
                message: this.emailBody
            };

            return templateParams;
        },
        // reset fields to initial state
        resetFields(){
            this.email = '';
            this.from = '';           
            this.emailBody = '';
            this.showConfirmation = false;
            this.disabledSubmit = false;
        },
        // send email with contact field info based on config values
        submit(){
            var valid = this.validateFields();
            if(valid){
                this.fieldsUnfilled = false;

                const template = this.setupEmailTemplate();                
            
                emailjs.send(process.env.EMAILJS_GMAIL_SERVICEID, process.env.EMAILJS_GMAIL_TEMPLATEID, template, process.env.EMAILJS_PUBLIC_KEY)
                    .then(() => {                                                 
                        this.showConfirmation = true;
                        this.disabledSubmit = true;

                        setTimeout(() => {
                                    this.resetFields();
                        }, 2000);
                    })
                    .catch((err) => {
                        console.log('FAILED...', err);                        
                    });
            } else {
                this.fieldsUnfilled = true;
            }
        }
    }
}
</script>

<style scoped>
    .alert.alert-success {        
        position: absolute;
        z-index: 5;
        top: 35%;
        left: 25%;    
    }
    .upload-enter-active, .upload-leave-active {
        transition: opacity .5s;
    }
    .upload-enter, .upload-leave-to {
        opacity: 0;
    }
</style>