<template>
  <section class='pl-4'>
      <header class='mt-3'>
          <h2>Contact Us</h2>
      </header>
      <transition name="upload">
        <div v-show="showConfirmationComputed" class="alert alert-success w-50 pt-4">                
            <p class='lead'>Message successfully sent!</p>
        </div>
      </transition>  
      <div class='pt-2'>
          <h4 class='has-error' v-show='fieldsUnfilledComputed'>All fields must be filled.</h4>
          <div class="form-group row no-gutters">            
            <label for="from" class="col-lg-2 col-form-label"><strong>Name:</strong></label>
            <div class="col-lg-6">
                <input type="text" v-model='from' class="form-control" id="from">
            </div>
          </div>
          <div class="form-group row no-gutters">
            <label for="from" class="col-lg-2 col-form-label"><strong>Email:</strong></label>
            <div class="col-lg-6">
                <input type="text" v-model='email' class="form-control" id="from">
            </div>
          </div>
          <div class="form-group row no-gutters">
            <label for="subject" class="col-lg-2 col-form-label"><strong>Subject:</strong></label>
            <div class="col-lg-6">
                <input type="text" v-model='subject' class="form-control" id="subject">
            </div>
          </div>
          <div class="form-group">
            <label for="emailBody" class='pb-2'><strong>Message:</strong></label>
            <textarea class="form-control col-lg-8" v-model='emailBody' id="emailBody" rows="5"></textarea>
          </div>
          <div class="form-group">
              <button class='btn btn-lg btn-primary col-lg-8 text-center' @click='submit'>Send</button>
          </div>
      </div>
  </section>
</template>

<script>
export default {
    data(){
        return {
            email: '',
            from: '',
            subject: '',
            emailBody: '',
            fieldsUnfilled: false,
            showConfirmation: false
        }
    },
    computed:{
        fieldsUnfilledComputed(){
            return this.fieldsUnfilled;
        },
        showConfirmationComputed(){
            return this.showConfirmation;
        }
    },
    methods: {
        validateFields(){
            if(!this.email || !this.from || !this.subject || !this.emailBody){                
                return false;
            } else {                
                return true;
            }
        },
        submit(){
            var valid = this.validateFields();
            if(valid){
                this.fieldsUnfilled = false;
                this.$axios.post('api/contact/submit', { from: this.from, subject: this.subject, emailBody: this.emailBody})
                    .then(() => {
                        this.showConfirmation = true;
                        setTimeout(() => {
                            this.showConfirmation = false;
                        }, 3000);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                this.fieldsUnfilled = true;
            }
        }
    }
}
</script>

<style scoped>
    .upload-enter-active, .upload-leave-active {
        transition: opacity .5s;
    }
    .upload-enter, .upload-leave-to {
        opacity: 0;
    }
</style>