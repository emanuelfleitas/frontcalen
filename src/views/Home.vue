<template>
  <div class="home">
  <!--  <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    
    <header>
      <nav>
        <a class="add-request">add request</a>
        <a class="sign-out">sign out</a>
      </nav>
    </header>

    <section class="content">

      <button  v-on:click="callFunction()">Enviar function</button>
      <h2>Users</h2>
      <form>
          <select name="user" v-model="user"  v-on:click="getDataUser(user)">
            <option v-for="user in users"  v-bind:key="user.id"  v-bind:value="user">
              {{user.name}}
            </option>
          </select>
          <!-- <input type="submit" value="Enviar"> -->
      </form>

      <h2>Events</h2>
      <form>
          <!--<select name="event" v-model="event"  v-on:click="getDataEvent(event)">
            <option v-for="event in events" v-bind:key="event.id" v-bind:value="event">
              {{event.name}}
            </option>
          </select>-->
          <!-- <input type="submit" value="Enviar"> -->
      </form>

      <h2>Load the events</h2>

      <form >
        <p>Title 
          <input type="text" id="title" name="title" placeholder="title.." v-model="summary" >
        </p>
        <p>Date start
          <input type="date" id="eventStart" name="eventStart"  v-model="dateStart">
        </p>
        <p>Date end
          <input type="date" id="eventEnd" name="eventEnd" v-model="dateEnd"> 
        </p>
        <p>Description
          <input type="text" id="description" name="description" placeholder="description.."  v-model="description">
        </p>
        <p>{{error}}</p>

        <button class="add" v-on:click="sendEvent($event)">Add event</button>
        <button class="update" v-on:click="updateEvent($event)">Update event</button>
        <button class="remove" v-on:click="deleteEvent($event)">Remove event</button>
      </form>
      <p class="error"></p>

    </section>
  </div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from '@/components/HelloWorld.vue' */

export default {
  name: 'Home',
   data(){
    return {
      // events:[],
      event:"",
      error:"",
      user:"",
      users: users,
      summary:"",
      dateStart:"",
      dateEnd:"",
      description:"",
      evento:{
        summary:"",
        dateStart:"",
        dateEnd:"",
        description:"",
        calendarId:"",
        userId:"",
        eventId:""
      }
    }
  },
  components: {
 /*    HelloWorld */
  },
   methods: {
    getDataUser(data){  
      console.log(this.user);
     
    },
    getDataEvent(data){  
      console.log(this.data);
  /*     this.callFunction() */
    },

    sendEvent(e){
      // this.callFunction()
      e.preventDefault();
      if(this.user!="" && this.summary!="" && this.description!="" && this.dateStart!="" && this.dateEnd!=""){
        this.error = ""
        this.evento.summary = this.summary
        this.evento.dateStart= this.formatDate(this.dateStart)
        this.evento.dateEnd= this.formatDate(this.dateEnd)
        this.evento.description = this.description
        this.evento.userId=this.user.id
        this.evento.calendarId = this.user.calendarId
        this.evento.eventId = "idtemporal"
        console.log("sended");
        console.log(this.evento);
      }else{
        this.error = "Debe completar los campos y seleccionar un usuario"
      }
    },
  
    updateEvent(){
      e.preventDefault();
      if(this.event!="" && this.summary!="" && this.description!="" && this.dateStart!="" && this.dateEnd!="") {
        this.error = ""
        this.evento.summary= this.summary
        this.evento.dateStart=this.dateStart
        this.evento.dateEnd= this.dateEnd
        this.evento.description = this.description
        console.log("update "+this.evento);
      }else{
        this.error = "Debe completar los campos y seleccionar un usuario y un evento"
      }
     
    },
    removeEvent(){
      e.preventDefault();
      if(this.event!="") {
        this.error = ""
        // this.evento.summary = this.summary
        // this.evento.dateStart= this.dateStart
        // this.evento.dateEnd= this.dateEnd
        // this.evento.description = this.description
        console.log("remove "+evento);
      }else{
        this.error = "Debe completar los campos y seleccionar un usuario y un evento"
      }
    
    },

    formatDate(data){
        let fecha = data
        let conDate1 = Date.parse(fecha)
        var eventyStart = new Date(conDate1);
        eventyStart.setDate(eventyStart.getDate()+1) 
        var eventyStartSelected = eventyStart.toISOString()
        return eventyStartSelected 
    },

  
    async callFunction() {
      // console.log(firebase.auth());
      let idToken ="test"
      //  await firebase.auth().currentUser.getIdToken();
      console.log(idToken);
      let response = await axios.get(
      '/addmessage'); 
      console.log(response);
      return response
      // const addMessage = httpsCallable(functions, 'addMessage');
      // addMessage({ text: "pepe" })
      // .then((result) => {
      //   const data = result.data;
      //   console.log(data);
      // }).catch((error) => {
      //   const code = error.code;
      //   console.log(error);
      // });
    },

    async bringEvents() {
        const bringEvent = httpsCallable(functions, 'getEvents');
        const result = await bringEvent(this.user.calendarId)
        const data = result.data;
        this.events = data
        console.log(data);
    },

    async sendEventFunction() {
        const sendingEvent = httpsCallable(functions, 'sendEvent');
        const result = await sendingEvent(this.evento)
        const data = result.data;
        console.log(data);
    },
  
    async updateEventFunction() {
        const updatingEvent = httpsCallable(functions, 'updateEvent');
        const result = await updatingEvent(this.evento)
        const data = result.data;
        console.log(data);
    },

    async removeEventFunction() {
        const deletingEvent = httpsCallable(functions, 'deleteEvent');
        const result = await deletingEvent(this.evento)
        const data = result.data;
        console.log(data);
    }
  },
}
</script>
