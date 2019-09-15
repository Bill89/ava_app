<template>
  <section>
    <h4 class="title f18 tl h30 lh30 mb6">{{ title }}</h4>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'SectionBox',
  props: {
    title: String
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 1.125rem;
  background-color: #256ef6;
  vertical-align: text-top;
  margin-right: 1rem;
}
</style>
