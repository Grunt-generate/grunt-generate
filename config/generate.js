module.exports = {
  options  : {
    src: 'templates',
    default: ".tmp/{{=path}}/{{=name}}",
    map: {
      "grunt/singleConfig" : "config/{{=name}}",
      "grunt/multiConfig" : "config/{{=name}}"
    }
  }
};