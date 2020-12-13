<template>
  <div>
    <asides v-show="isAsidesShow"></asides>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import asides from '@/components/asides'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['isAsidesShow'])
  },
  components: {
    asides
  }
}
</script>
<style lang="scss">
html{
  font-size: 26.67vw;
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
ul{
  list-style: none;
}
section{
  margin-bottom: .5rem;
}
</style>
