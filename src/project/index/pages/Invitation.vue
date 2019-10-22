<template>
  <div style="width: 100%;height: 100%">
    <iframe src="../../../static/h5/index.html" frameborder="0" name="showHere" scrolling=auto width='100%' height='100%'></iframe>
  </div>
</template>

<script>
    export default {
      name: "Invitation",
      data(){
        return{
          uuid :''
        }
      },
      created() {
        this.uuid = this.$route.query.uuid;
      },
      mounted() {
        window.getUUid = this.getUUid;
      },
      methods:{
        getUUid(){
          let uuid = this.uuid;
          return uuid;
        }
      }
    }
</script>

<style lang="less" scoped>

</style>
