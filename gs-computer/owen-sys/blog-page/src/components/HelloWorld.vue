<template>
  <div class="hello">
    
    <!-- <draggable
      class="list"
      v-model="list"
      :options="{group: {name: 'layout', pull: 'clone', put: false}, draggable: '.item', forceFallback: true, sort: false, animation: 50}"
      @end="onEnd">
      <transition-group tag="ul">
        <li v-for="(item, index) in list" :key="index" class="item">
        <div class="holder">
          <img :src="item.icon" />
          <h3>{{item.text}}</h3>
        </div>
        </li>
      </transition-group>
    </draggable> --> <!-- https://sortablejs.github.io/Vue.Draggable/#/transition-example -->

    <draggable
      :list="list"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <transition-group tag="div">
        <div
          class="list-group-item"
          v-for="element in list"
          :key="element.name">
          {{ element.name }}
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    draggable
  },
  data () {
    return {
      enabled: true,
      list: [
        { name: "John", id: 0 },
        { name: "Joao", id: 1 },
        { name: "Jean", id: 2 }
      ],
      dragging: false
    }
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
  },
  methods: {
    checkMove: function(e) {
      console.log(process.env)
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-group-item {
  display: inline-block;
  width: 200px;
}
</style>
