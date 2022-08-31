export default {
  portType: (that) => {
    let num = that.$store.state.clsList.length - 1;
    return that.$store.state.clsList[Math.floor(Math.random() * num)];
  }
};
