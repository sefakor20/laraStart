<template>
    <div class="container">
        <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Table</h3>

                <div class="card-tools">
                  <button class="btn btn-success" data-toggle="modal" data-target="#addNew">Add new <i class="fas fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Registered At</th>
                    <th>Modify</th>
                  </tr>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.type | upText}}</td>
                    <td>{{user.created_at | myDate}}</td>
                    <td>
                      <a href="#">
                        <i class="fa fa-edit blue"></i>
                      </a> |
                      <a href="#" @click="deleteUser(user.id)">
                        <i class="fa fa-trash red"></i>
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div><!-- /.row -->


        <!-- add modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addNewLabel">Add New</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form @submit.prevent="createUser">
                <div class="modal-body">
                  <div class="form-group">
                    <input v-model="form.name" type="text" name="name"
                      placeholder="Name"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                    <has-error :form="form" field="name"></has-error>
                  </div>

                  <div class="form-group">
                    <input v-model="form.email" type="email" name="email"
                      placeholder="Email Address"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                    <has-error :form="form" field="email"></has-error>
                  </div>

                  <div class="form-group">
                    <textarea v-model="form.bio"  name="bio"
                      placeholder="Short bio for user (Optional)"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                    <has-error :form="form" field="bio"></has-error>
                  </div>

                  <div class="form-group">
                    <select v-model="form.type" name="type" id="type" class="form-control"
                    :class="{'is-invalid': form.errors.has('type') }">
                      <option value="">Select User Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">Standard User</option>
                      <option value="author">Author</option>
                    </select>
                    <has-error :form="form" field="type"></has-error>
                  </div>

                  <div class="form-group">
                    <input v-model="form.password" type="password" name="password" id="password"
                      placeholder="Password"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                    <has-error :form="form" field="password"></has-error>
                  </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary"> Create</button>
              </div>
            </form>
          </div>
        </div>
        <!-- ./modal -->

    </div>
    </div>
</template>

<script>
    export default {
        data(){
          return{
            users: {},
             form: new Form({
               name: '',
               email: '',
               password: '',
               type: '',
               bio: '',
               photo: '',
             })
          }
        },

        methods: {
          //fetch users from db
          loadUsers(){
            axios.get("api/user").then(({ data }) => (this.users = data.data));
          },

          //create a new user
          createUser() {
            //start progress bar
            this.$Progress.start();

            //submit user input
            this.form.post('api/user')
            
            .then(()=>{
               //create an event listner
              Fire.$emit('AfterCreate');

              //hide modal after form submission
              $('#addNew').modal('hide');

              ///flash a message
              toast.fire({
                icon: 'success',
                title: 'User created successfully'
              })

              //finish the progress bar
              this.$Progress.finish();
            })
           .catch(()=>{
             
           })
          },


          //delete user data
          deleteUser(){
            swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {

              //send request to the server
              this.form.delete('api/user/'+id).then(() => {
                  if (result.value) {
                      swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    }
              }).catch(() => {
                swal.fire("Failed!", "There was something wrong.", "warning");
              });
              
            })
        }

      },

        created() {
            this.loadUsers();
          
            //load users data after every 3sec
            Fire.$on('AfterCreate', () => {
              this.loadUsers();
            });
            // setInterval(() => this.loadUsers(), 3000);
        }
    }
</script>
