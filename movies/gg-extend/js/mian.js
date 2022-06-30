var svg = $('#box').html();
$.ajax({
  type: "GET",
  url: "http://www.happi123.com/add",
  data: {
    data: 'test',
    name: 'sdf',
    age: 12
  },
  dataType: "json",
  success: function(data){
   console.log(data)
  }
});