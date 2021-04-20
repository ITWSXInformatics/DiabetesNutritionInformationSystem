function handleHealthCheckDeletion(){
  $('.delete-hc').on('click', function(){
    var date = $(this).attr('data-date');
    console.log(date);

    var data = {date: date};

    fetch("/dailyHealthCheck/delete", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    }).then((res) => {
        window.location.replace("/dashboard");
    }).catch((err) => {console.log(err)});
  })
}

$(document).ready(function(){
  if($(".alert-danger")[0]){
    $('#addDataModal').modal('show');
  }
  
  handleHealthCheckDeletion();
})