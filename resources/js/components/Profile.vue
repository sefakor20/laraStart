<style>
  .widget-user-header{
    background-position: center center;
    background-size: cover;
  }
</style>
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <!-- Widget: user widget style 1 -->
              <div class="card card-widget widget-user mt-3">
                <!-- Add the bg color to the header using any of the bg-* classes -->
                <div class="widget-user-header text-white"
                    style="background-image: url('./img/profile_cover.jpg'); height: 250px;">
                  <h3 class="widget-user-username text-right">Elizabeth Pierce</h3>
                  <h5 class="widget-user-desc text-right">Web Designer</h5>
                </div>
                <div class="widget-user-image">
                  <img class="img-circle" src="" alt="User Avatar">
                </div>
                <div class="card-footer">
                  <div class="row">
                    <div class="col-sm-4 border-right">
                      <div class="description-block">
                        <h5 class="description-header">3,200</h5>
                        <span class="description-text">SALES</span>
                      </div>
                      <!-- /.description-block -->
                    </div>
                    <!-- /.col -->
                    <div class="col-sm-4 border-right">
                      <div class="description-block">
                        <h5 class="description-header">13,000</h5>
                        <span class="description-text">FOLLOWERS</span>
                      </div>
                      <!-- /.description-block -->
                    </div>
                    <!-- /.col -->
                    <div class="col-sm-4">
                      <div class="description-block">
                        <h5 class="description-header">35</h5>
                        <span class="description-text">PRODUCTS</span>
                      </div>
                      <!-- /.description-block -->
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->
                </div>
              </div>
              <!-- /.widget-user -->
            </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                  <li class="nav-item"><a class="nav-link active" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="activity">
                    <!-- The timeline -->
                    <h3 class="text-center">Display User Activity</h3>
                  </div>
                  <!-- /.tab-pane -->

                  <div class="tab-pane" id="settings">
                    <form class="form-horizontal">
                      <div class="form-group">
                        <label for="inputName" class="col-sm-2 control-label">Name</label>

                        <div class="col-sm-12">
                          <input type="Name" v-model="form.name" class="form-control" id="inputName" placeholder="Name">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                        <div class="col-sm-12">
                          <input type="email" v-model="form.email" class="form-control" id="inputEmail" placeholder="Email">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputExperience" class="col-sm-2 control-label">Experience</label>

                        <div class="col-sm-12">
                          <textarea class="form-control" v-model="form.bio" id="inputExperience" placeholder="Experience"></textarea>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputSkills" class="col-sm-2 control-label">Profile Photo</label>

                        <div class="col-sm-12">
                          <input type="file" @change="updateProfile" name="profilePhoto">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputSkills" class="col-sm-6 control-label">Passport (Leave empty if not changing)</label>

                        <div class="col-sm-12">
                          <input type="text" class="form-control" name="passport">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <button type="submit" @click.prevent="updateInfo" class="btn btn-success">Update</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
          </div>
        </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          form: new Form({
               id: '',
               name: '',
               email: '',
               password: '',
               type: '',
               bio: '',
               photo: '',
             })
        }
      },

        mounted() {
            console.log('Component mounted.')
        },

        methods: {
          //update users info
          updateInfo() {
            this.$Progress.start();
            this.form.put('api/profile/')
            .then(() =>{
              this.$Progress.finish();
            })
            .catch(() => {
              this.$Progress.fail();
            })
          },


          //convert user profile image to BASE 64
          updateProfile(e){
            // console.log('uploading...');
              let file = e.target.files[0];
              let reader = new FileReader();

              if(file['size'] < 2111775){
                  reader.onloadend = (file) => {
                  //console.log('RESULT', reader.result);
                  this.form.photo = reader.result;
                  }
                  reader.readAsDataURL(file);
                }else{
                    swal.fire({
                      type: 'error',
                      title: 'Oops...',
                      text: 'You are uploading a large file',
                      icon: 'warning'
                    })
                }
          }

        },

        created() {
          axios.get("api/profile")
          .then(({ data }) => (this.form.fill(data)));
        }
    }
</script>
