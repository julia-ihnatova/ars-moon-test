<template>
  <div class="switch-sort">
    <div class="text"> Сортировка по алфавиту</div>
    <label class="switch">
      <input :value="sortAlphabet" type="checkbox" @input="updateSort">
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
name: "SwitchSort",
data(){
return {

}
},
  computed: {
    ...mapState({
      sortAlphabet: state => state.sortAlphabet
    })
  },
  methods: {
    updateSort (e) {
      this.$store.commit('updateSort',e.target.checked)
    },
  }
}
</script>

<style scoped>
.switch-sort{
  position: absolute;
  right:0;
  display: flex;
  align-items: center;
}


.switch {
  position: relative;
  width: 30px;
  height: 15px;
  margin-left:15px;
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 9px;
  width: 10px;
  left: 2px;
  bottom: 2px;
  background-color: rgba(98, 98, 98, 1);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {

}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(12px);
  -ms-transform: translateX(12px);
  transform: translateX(12px);
}

/* Rounded sliders */
.slider.round {
  border: 1px solid rgba(98, 98, 98, 1);
  border-radius: 9px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>